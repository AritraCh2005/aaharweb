"use client"

import { useContext, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { CartContext } from "../AppContext"
import toast from "react-hot-toast"
import MenuItemTile from "../menu/MenuItemTile"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } = menuItem
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)
  const { data: session, status } = useSession()
  const router = useRouter()

  async function handleAddToCartButtonClick() {
    // Check authentication using useSession directly
    if (status === "unauthenticated") {
      toast.error("Please login to add items to cart")
      router.push("/login")
      return
    }

    // If still loading, wait
    if (status === "loading") {
      toast.error("Please wait...")
      return
    }

    const hasOptions = sizes?.length > 0 || extraIngredientPrices?.length > 0
    if (hasOptions && !showPopup) {
      setShowPopup(true)
      return
    }

    // Add multiple items based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(menuItem, selectedSize, selectedExtras)
    }
    setShowPopup(false)
    setQuantity(1) // Reset quantity
    toast.success(`Added ${quantity} item(s) to cart!`)
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing])
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name)
      })
    }
  }

  let selectedPrice = basePrice
  if (selectedSize) {
    selectedPrice += selectedSize.price
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price
    }
  }

  const totalPrice = selectedPrice * quantity

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div
            className="bg-white rounded-3xl max-w-lg w-full flex flex-col shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
            style={{ maxHeight: "95vh" }}
          >
            {/* Header with Image */}
            <div className="relative h-56 w-full flex-shrink-0">
              <Image src={image || "/placeholder.svg?height=224&width=448"} alt={name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Close Button - Updated with red background */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 w-10 h-10 border-2 border-red-500 rounded-full flex items-center justify-center text-red-500 hover:border-red-600 hover:text-red-600 transition-colors text-xl font-bold"
              >
                ×
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
                <p className="text-white/90 text-sm leading-relaxed">{description}</p>
              </div>
            </div>

            {/* Content - Make this scrollable */}
            <div className="p-6 space-y-6 overflow-y-auto flex-grow">
              {/* Size Selection */}
              {sizes?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">Choose your size</h3>
                  </div>
                  <div className="grid gap-3">
                    {sizes.map((size, index) => (
                      <label
                        key={index}
                        className={`relative flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedSize?.name === size.name
                            ? "border-orange-500 bg-orange-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedSize?.name === size.name ? "border-orange-500 bg-orange-500" : "border-gray-300"
                            }`}
                          >
                            {selectedSize?.name === size.name && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <span className="font-medium text-gray-900">{size.name}</span>
                        </div>
                        <span className="font-semibold text-gray-900">${(basePrice + size.price).toFixed(2)}</span>
                        <input
                          type="radio"
                          name="size"
                          checked={selectedSize?.name === size.name}
                          onChange={() => setSelectedSize(size)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Extras Selection */}
              {extraIngredientPrices?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">Add extras</h3>
                  </div>
                  <div className="grid gap-3">
                    {extraIngredientPrices.map((extraThing, index) => (
                      <label
                        key={index}
                        className={`relative flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedExtras.some((e) => e.name === extraThing.name)
                            ? "border-orange-500 bg-orange-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedExtras.some((e) => e.name === extraThing.name)
                                ? "border-orange-500 bg-orange-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedExtras.some((e) => e.name === extraThing.name) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="font-medium text-gray-900">{extraThing.name}</span>
                        </div>
                        <span className="font-semibold text-orange-600">+${extraThing.price.toFixed(2)}</span>
                        <input
                          type="checkbox"
                          name={extraThing.name}
                          checked={selectedExtras.some((e) => e.name === extraThing.name)}
                          onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector - Updated with black background buttons */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">Quantity</h3>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-yellow-500 text-yellow-500 flex items-center justify-center hover:border-yellow-600 hover:text-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-gray-900 min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-yellow-500 text-yellow-500 flex items-center justify-center hover:border-yellow-600 hover:text-yellow-600 transition-colors text-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Footer - Now outside the scrollable area */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
              <button
                className="w-full flex items-center justify-center gap-3 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl transition-colors shadow-lg hover:shadow-xl"
                onClick={handleAddToCartButtonClick}
                type="button"
              >
                <ShoppingCart size={20} />
                <span>
                  Add {quantity} to cart · ${totalPrice.toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile onAddToCart={handleAddToCartButtonClick} session={session} status={status} {...menuItem} />
    </>
  )
}
