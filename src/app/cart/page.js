"use client"

import { useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CartContext, cartProductPrice } from "../../components/AppContext"
import Image from "next/image"
import AddressInputs from "../../components/layout/AddressInputs"
import { useProfile } from "../../components/UseProfile"
import { ShoppingCart, Trash2, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"

// Remote logging function for production debugging
const remoteLog = (level, message, data = null) => {
  const logData = {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
    url: typeof window !== "undefined" ? window.location.href : "unknown",
    viewport:
      typeof window !== "undefined"
        ? {
            width: window.innerWidth,
            height: window.innerHeight,
          }
        : null,
  }

  // Log to console for immediate debugging
  console[level](`[REMOTE_LOG] ${message}`, logData)

  // Send to your logging service (optional - replace with your logging endpoint)
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    try {
      // You can replace this with your actual logging service
      fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData),
      }).catch(() => {}) // Silent fail for logging
    } catch (e) {
      // Silent fail for logging
    }
  }
}

export default function CartPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [address, setAddress] = useState({})
  const [isClient, setIsClient] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [errorLogs, setErrorLogs] = useState([])

  // Safely get cart context with error handling
  const cartContext = useContext(CartContext)
  let cartProducts = [],
    removeCartProduct = () => {}

  if (cartContext) {
    cartProducts = cartContext.cartProducts || []
    removeCartProduct = cartContext.removeCartProduct || (() => {})
  } else {
    remoteLog("warn", "CartContext is null or undefined")
  }

  // Add error to local state for debugging
  const addErrorLog = (error, context) => {
    const errorLog = {
      error: error.message || error,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    }
    setErrorLogs((prev) => [...prev.slice(-9), errorLog]) // Keep last 10 errors
    remoteLog("error", `Cart Error: ${context}`, errorLog)
  }

  // Global error handler
  useEffect(() => {
    const handleError = (event) => {
      addErrorLog(event.error || event, "Global Error Handler")
    }

    const handleUnhandledRejection = (event) => {
      addErrorLog(event.reason || event, "Unhandled Promise Rejection")
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  // Safely get profile data with error handling
  let profileData
  try {
    const profileHook = useProfile()
    profileData = profileHook?.data
  } catch (error) {
    addErrorLog(error, "useProfile Hook")
  }

  // Client-side hydration
  useEffect(() => {
    remoteLog("info", "Component mounting")
    setIsClient(true)

    // Check for debug mode (add ?debug=true to URL)
    const urlParams = new URLSearchParams(window.location.search)
    setDebugMode(urlParams.get("debug") === "true")
  }, [])

  // Authentication handling
  useEffect(() => {
    if (isClient && status === "unauthenticated") {
      remoteLog("info", "Redirecting unauthenticated user")
      try {
        router.push("/login")
      } catch (error) {
        addErrorLog(error, "Router Navigation")
        // Fallback navigation
        window.location.href = "/login"
      }
    }
  }, [status, isClient, router])

  // Profile data handling
  useEffect(() => {
    try {
      if (profileData?.city) {
        const { phone, streetAddress, city, postalCode, country } = profileData
        const addressFromProfile = {
          phone: phone || "",
          streetAddress: streetAddress || "",
          city: city || "",
          postalCode: postalCode || "",
          country: country || "",
        }
        setAddress(addressFromProfile)
        remoteLog("info", "Address set from profile", addressFromProfile)
      }
    } catch (error) {
      addErrorLog(error, "Profile Data Processing")
    }
  }, [profileData])

  // Safe price calculation with extensive error handling
  const calculateSubtotal = () => {
    try {
      if (!cartProducts || !Array.isArray(cartProducts)) {
        remoteLog("warn", "Invalid cartProducts", { cartProducts })
        return 0
      }

      let subtotal = 0
      for (let i = 0; i < cartProducts.length; i++) {
        const product = cartProducts[i]
        try {
          if (product && typeof cartProductPrice === "function") {
            const price = cartProductPrice(product)
            if (typeof price === "number" && !isNaN(price)) {
              subtotal += price
            } else {
              remoteLog("warn", `Invalid price for product ${i}`, { product, price })
            }
          } else {
            remoteLog("warn", `Invalid product or cartProductPrice function`, {
              product,
              hasCartProductPrice: typeof cartProductPrice === "function",
            })
          }
        } catch (error) {
          addErrorLog(error, `Price calculation for product ${i}`)
        }
      }
      return subtotal
    } catch (error) {
      addErrorLog(error, "Subtotal Calculation")
      return 0
    }
  }

  const subtotal = calculateSubtotal()
  const deliveryFee = 5.99
  const total = subtotal + deliveryFee

  function handleAddressChange(propName, value) {
    try {
      setAddress((prevAddress) => ({
        ...prevAddress,
        [propName]: value || "",
      }))
    } catch (error) {
      addErrorLog(error, "Address Change Handler")
    }
  }

  function handleRemoveProduct(index) {
    try {
      if (removeCartProduct && typeof removeCartProduct === "function") {
        removeCartProduct(index)
        remoteLog("info", `Product removed at index ${index}`)
      } else {
        remoteLog("error", "removeCartProduct function not available")
      }
    } catch (error) {
      addErrorLog(error, `Remove Product ${index}`)
    }
  }

  // Debug panel (only shows when ?debug=true is in URL)
  const DebugPanel = () => {
    if (!debugMode) return null

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white p-4 max-h-64 overflow-y-auto z-50">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Debug Panel</h3>
          <button onClick={() => setDebugMode(false)} className="text-red-400 hover:text-red-300">
            ✕
          </button>
        </div>
        <div className="text-xs space-y-1">
          <div>Status: {status}</div>
          <div>Cart Products: {cartProducts?.length || 0}</div>
          <div>Has CartContext: {!!cartContext ? "Yes" : "No"}</div>
          <div>Has Profile: {!!profileData ? "Yes" : "No"}</div>
          <div>Subtotal: ${subtotal.toFixed(2)}</div>
          <div>User Agent: {navigator.userAgent}</div>
          <div>
            Viewport: {window.innerWidth}x{window.innerHeight}
          </div>
        </div>
        {errorLogs.length > 0 && (
          <div className="mt-2">
            <h4 className="font-semibold text-red-400">Recent Errors:</h4>
            {errorLogs.slice(-3).map((log, i) => (
              <div key={i} className="text-xs text-red-300 truncate">
                {log.context}: {log.error}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Loading state
  if (!isClient || status === "loading") {
    return (
      <>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <DebugPanel />
      </>
    )
  }

  // Unauthenticated state
  if (status === "unauthenticated") {
    return <DebugPanel />
  }

  // Empty cart state
  if (!cartProducts?.length) {
    return (
      <>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gray-100 p-6 rounded-full inline-block mb-4">
              <ShoppingCart size={64} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-red-500 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <DebugPanel />
      </>
    )
  }

  // Main cart content
  return (
    <>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-yellow-400 sm:text-4xl font-serif">Your Cart</h1>
            <p className="mt-2 text-lg text-green-500">Review your items and checkout when you're ready</p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            {/* Cart Items */}
            <section className="lg:col-span-7">
              <div className="bg-white shadow-sm rounded-lg mb-8">
                <div className="px-4 py-6 sm:px-6">
                  <h2 className="text-lg font-bold text-gray-900">Cart Items ({cartProducts?.length || 0})</h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <ul role="list" className="divide-y divide-gray-200">
                    {cartProducts.map((product, index) => {
                      if (!product) {
                        remoteLog("warn", `Null product at index ${index}`)
                        return null
                      }

                      return (
                        <li key={`${product.name || "product"}-${index}`} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                            <Image
                              src={product.image || "/placeholder.svg?height=200&width=200"}
                              width={200}
                              height={200}
                              alt={product.name || "Product"}
                              className="w-full h-full object-center object-cover"
                              priority={index < 3}
                              onError={(e) => {
                                remoteLog("warn", `Image load error for product ${index}`, { src: e.target.src })
                                e.target.src = "/placeholder.svg?height=200&width=200"
                              }}
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 className="truncate pr-2">{product.name || "Unknown Product"}</h3>
                                <p className="ml-4 flex-shrink-0">
                                  ${(() => {
                                    try {
                                      return cartProductPrice(product).toFixed(2)
                                    } catch (error) {
                                      addErrorLog(error, `Price display for product ${index}`)
                                      return "0.00"
                                    }
                                  })()}
                                </p>
                              </div>

                              {product.size?.name && (
                                <p className="mt-1 text-sm text-gray-500">Size: {product.size.name}</p>
                              )}
                            </div>

                            {product.extras?.length > 0 && (
                              <div className="mt-2">
                                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Extras:</h4>
                                <ul className="mt-1 space-y-1">
                                  {product.extras.map((extra, i) => {
                                    if (!extra) return null
                                    return (
                                      <li
                                        key={`${extra.name || "extra"}-${i}`}
                                        className="text-sm text-gray-500 flex justify-between"
                                      >
                                        <span className="truncate pr-2">{extra.name || "Extra"}</span>
                                        <span className="flex-shrink-0">${(extra.price || 0).toFixed(2)}</span>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </div>
                            )}

                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center space-x-2"></div>
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProduct(index)}
                                  className="font-medium text-orange-600 hover:text-orange-500 inline-flex items-center touch-manipulation"
                                  style={{ minHeight: "44px", minWidth: "44px" }} // Better mobile touch target
                                >
                                  <Trash2 size={16} className="mr-1" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Order Notes</h2>
                <textarea
                  rows={3}
                  className="shadow-sm block w-full focus:ring-orange-500 focus:border-orange-500 sm:text-sm border border-gray-300 rounded-md p-2 resize-none"
                  placeholder="Special instructions for your order..."
                />
              </div>
            </section>

            {/* Order Summary */}
            <section className="mt-16 lg:mt-0 lg:col-span-5">
              <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-600">Delivery Fee</dt>
                      <dd className="text-sm font-medium text-gray-900">${deliveryFee.toFixed(2)}</dd>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                      <dt className="text-base font-medium text-gray-900">Order Total</dt>
                      <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Information</h2>
                  {(() => {
                    try {
                      return <AddressInputs addressProps={address} setAddressProps={handleAddressChange} />
                    } catch (error) {
                      addErrorLog(error, "AddressInputs Component")
                      return <div className="text-sm text-red-500">Address form temporarily unavailable</div>
                    }
                  })()}
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <div className="relative flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer hover:border-orange-500 transition-colors touch-manipulation">
                      <input
                        id="payment-card"
                        name="payment-method"
                        type="radio"
                        className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                        defaultChecked
                      />
                      <label htmlFor="payment-card" className="ml-3 flex flex-col cursor-pointer">
                        <span className="block text-sm font-medium text-gray-900">Credit Card</span>
                        <span className="block text-sm text-gray-500">Pay with your credit card</span>
                      </label>
                      <CreditCard className="ml-auto h-5 w-5 text-gray-400" />
                    </div>

                    <div className="relative flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer hover:border-orange-500 transition-colors touch-manipulation">
                      <input
                        id="payment-cash"
                        name="payment-method"
                        type="radio"
                        className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                      />
                      <label htmlFor="payment-cash" className="ml-3 flex flex-col cursor-pointer">
                        <span className="block text-sm font-medium text-gray-900">Cash on Delivery</span>
                        <span className="block text-sm text-gray-500">Pay when your order arrives</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors flex items-center justify-center touch-manipulation"
                    style={{ minHeight: "48px" }} // Better mobile touch target
                  >
                    Complete Order
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    By placing your order, you agree to our{" "}
                    <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                      Terms and Conditions
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <DebugPanel />
    </>
  )
}
