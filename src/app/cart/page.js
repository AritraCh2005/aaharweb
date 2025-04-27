"use client"

import { useContext, useEffect, useState } from "react"
import { CartContext, cartProductPrice } from "../../components/AppContext"
import Image from "next/image"
import AddressInputs from "../../components/layout/AddressInputs"
import { useProfile } from "../../components/UseProfile"
import { Minus, Plus, ShoppingCart, Trash2, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext)
  const [address, setAddress] = useState({})
  const { data: profileData } = useProfile()

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData
      setAddress({ phone, streetAddress, city, postalCode, country })
    }
  }, [profileData])

  function handleAddressChange(field, value) {
    setAddress((prev) => ({ ...prev, [field]: value }))
  }

  // Calculate subtotal in a safe way
  const subtotal =
    cartProducts?.reduce((sum, p) => {
      // ensure cartProductPrice(p) returns a number or fallback to 0
      return sum + (cartProductPrice(p) ?? 0)
    }, 0) || 0
  const deliveryFee = 5.99
  const total = subtotal + deliveryFee

  // Empty Cart
  if (!cartProducts?.length) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="bg-gray-100 p-6 rounded-full inline-block mb-4">
            <ShoppingCart size={64} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your Cart</h1>
          <p className="mt-2 text-lg text-gray-600">Review your items and checkout when you're ready</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {/* Cart Items */}
          <section className="lg:col-span-7 space-y-8">
            {/* Items List */}
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-4 py-6 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Cart Items ({cartProducts.length})</h2>
              </div>
              <ul className="divide-y divide-gray-200 px-4 py-6 sm:px-6" role="list">
                {cartProducts.map((product, idx) => (
                  <li key={idx} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        width={200}
                        height={200}
                        alt={product.name || "Product"}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{product.name}</h3>
                        <p>${(cartProductPrice(product) ?? 0).toFixed(2)}</p>
                      </div>

                      {product.size && <p className="mt-1 text-sm text-gray-500">Size: {product.size.name}</p>}

                      {product.extras?.length > 0 && (
                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Extras:</h4>
                          <ul className="mt-1 space-y-1">
                            {product.extras.map((extra, i) => (
                              <li key={i} className="text-sm text-gray-500 flex justify-between">
                                <span>{extra.name}</span>
                                <span>${(extra.price ?? 0).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex-1 flex items-end justify-between text-sm mt-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <Minus size={16} />
                          </button>
                          <span className="font-medium text-gray-700">1</span>
                          <button className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors">
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeCartProduct(idx)}
                          className="font-medium text-orange-600 hover:text-orange-500 inline-flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Notes */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Notes</h2>
              <textarea
                rows={3}
                className="shadow-sm block w-full focus:ring-orange-500 focus:border-orange-500 sm:text-sm border border-gray-300 rounded-md p-2"
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
                <AddressInputs address={address} onAddressChange={handleAddressChange} />
              </div>

              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="relative flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer hover:border-orange-500 transition-colors">
                    <input
                      type="radio"
                      name="payment-method"
                      className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                      defaultChecked
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Credit Card</p>
                      <p className="text-sm text-gray-500">Pay with your credit card</p>
                    </div>
                    <CreditCard className="ml-auto h-5 w-5 text-gray-400" />
                  </label>

                  <label className="relative flex items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer hover:border-orange-500 transition-colors">
                    <input
                      type="radio"
                      name="payment-method"
                      className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when your order arrives</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-6">
                <button className="w-full flex items-center justify-center gap-2 bg-orange-500 py-3 rounded-md text-white font-medium hover:bg-orange-600 transition-colors">
                  Complete Order
                  <ArrowRight size={16} />
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
  )
}
