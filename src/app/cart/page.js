"use client"
import { useContext, useEffect, useState } from "react"
import { CartContext, cartProductPrice } from "../../components/AppContext"
import SectionHeaders from "../../components/layout/SectionHeaders"
import Image from "next/image"
import Trash from "../../components/icons/Trash"
import AddressInputs from "../../components/layout/AddressInputs"
import { useProfile } from "../../components/UseProfile"

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext)
  const [address, setAddress] = useState({})
  const { data: profileData } = useProfile()

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      }
      setAddress(addressFromProfile)
    }
  }, [profileData])

  let total = 0
  for (const p of cartProducts) {
    total += cartProductPrice(p)
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }))
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <SectionHeaders mainHeader="Cart" />

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {cartProducts?.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p>Add some delicious items to get started</p>
            </div>
          )}

          {cartProducts?.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b">Your Items</h2>
              <div className="space-y-6">
                {cartProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        width={100}
                        height={100}
                        alt={product.name || "Food item"}
                        className="object-cover"
                      />
                    </div>
                    <div className="grow">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      {product.size && (
                        <div className="text-sm text-gray-600 mt-1">
                          Size: <span className="font-medium">{product.size.name}</span>
                        </div>
                      )}
                      {product.extras?.length > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          {product.extras.map((extra, i) => (
                            <div key={i} className="flex justify-between">
                              <span>Extra {extra.name}</span>
                              <span>${extra.price}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
                    <div className="ml-2">
                      <button
                        type="button"
                        onClick={() => removeCartProduct(index)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-4 text-right mt-4 border-t">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-xl font-bold pl-2">${total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6 pb-2 border-b">Checkout</h2>
          <form>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
              <AddressInputs addressProps={address} setAddressProps={handleAddressChange} />
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total amount:</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                Complete Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
