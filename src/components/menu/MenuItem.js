

// import React, { useContext } from "react";
// import { CartContext } from "../AppContext";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import MenuItemTile from "../menu/MenuItemTile";
// import Image from "next/image";

// export default function MenuItem(menuItem) {
//   const { image, name, description, basePrice, sizes, extraIngredientPrices } =
//     menuItem;

//   const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
//   const [selectedExtras, setSelectedExtras] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const { addToCart } = useContext(CartContext);

//   async function handleAddToCartButtonClick() {
//     const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
//     if (hasOptions && !showPopup) {
//       setShowPopup(true);
//       return;
//     }

//     addToCart(menuItem, selectedSize, selectedExtras);
//     setShowPopup(false);
//     toast.success("Item added to cart");
//   }

//   function handleExtraThingClick(ev, extraThing) {
//     const checked = ev.target.checked;
//     if (checked) {
//       setSelectedExtras((prev) => [...prev, extraThing]);
//     } else {
//       setSelectedExtras((prev) => {
//         return prev.filter((e) => e.name !== extraThing.name);
//       });
//     }
//   }

//   // Log sizes for debugging outside JSX
//   console.log(sizes);

//   let selectedPrice = basePrice;
//   if (selectedSize) {
//     selectedPrice += selectedSize.price;
//   }

//   if (selectedExtras?.length > 0) {
//     for (const extra of selectedExtras) {
//       selectedPrice += extra.price;
//     }
//   }

//   return (
//     <>
// {showPopup && (
//   <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
//     <div className="bg-white p-4 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//       <Image
//         src={image}
//         alt={name}
//         width={300}
//         height={200}
//         className="mx-auto"
//       />
//       <h2 className="text-xl font-bold mb-2 text-center">{name}</h2>
//       <p className="text-gray-700 mb-4 text-center">{description}</p>
//       {sizes?.length > 0 && (
//         <div className="p-2">
//           <h3 className="text-center font-medium text-lg text-blue-800">
//             Pick your size
//           </h3>
//           {sizes.map((size) => (
//             <label className=" flex items-center gap-3 p-4 text-center border rounded-md mb-1">
//               <input
//                 type="radio"
//                 onClick={() => setSelectedSize(size)}
//                 checked={selectedSize?.name === size.name}
//                 name="size"
//               />
//               {size.name} ${basePrice + size.price}
//             </label>
//           ))}
//         </div>
//       )}

//       {extraIngredientPrices?.length > 0 && (
//         <div className="p-2">
//           <h3 className="text-center font-medium text-lg text-blue-800">
//             Pick toppings
//           </h3>
//           {extraIngredientPrices.map((extraThing) => (
//             <label className=" flex items-center gap-3 p-4 text-center border rounded-md mb-1">
//               <input
//                 onClick={(ev) => handleExtraThingClick(ev, extraThing)}
//                 type="checkbox"
//                 name={extraThing.name}
//               />
//               {extraThing.name} +${extraThing.price}
//             </label>
//           ))}
//         </div>
//       )}
//       <button
//         className="bg-green-600 text-white sticky bottom-2 w-full p-2"
//         onClick={handleAddToCartButtonClick}
//         type="button"
//       >
//         Add to Cart ${selectedPrice}
//       </button>

//       <button
//         onClick={() => setShowPopup(false)}
//         className="mt-2 bg-red-500 text-white px-4 py-2 rounded w-full"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}

//       <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
//     </>
//   );
// }


"use client"

import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import toast from "react-hot-toast"
import MenuItemTile from "../menu/MenuItemTile"
import Image from "next/image"
import { ShoppingCart, X } from "lucide-react"

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } = menuItem

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const { addToCart } = useContext(CartContext)

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0
    if (hasOptions && !showPopup) {
      setShowPopup(true)
      return
    }

    addToCart(menuItem, selectedSize, selectedExtras)
    setShowPopup(false)
    toast.success("Added to cart!")
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

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <X size={24} />
            </button>

            <div className="relative h-48 w-full">
              <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover rounded-t-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-sm opacity-90">{description}</p>
              </div>
            </div>

            <div className="p-6">
              {sizes?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3 text-gray-800 flex items-center">
                    <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                      1
                    </span>
                    Choose size
                  </h3>
                  <div className="space-y-2">
                    {sizes.map((size, index) => (
                      <label
                        key={index}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedSize?.name === size.name
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="size"
                            checked={selectedSize?.name === size.name}
                            onChange={() => setSelectedSize(size)}
                            className="w-4 h-4 text-orange-500 focus:ring-orange-500 mr-3"
                          />
                          <span>{size.name}</span>
                        </div>
                        <span className="font-medium">${(basePrice + size.price).toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3 text-gray-800 flex items-center">
                    <span className="w-6 h-6 bg-orange-100 text-orange-500 rounded-full inline-flex items-center justify-center mr-2 text-sm">
                      2
                    </span>
                    Add extras
                  </h3>
                  <div className="space-y-2">
                    {extraIngredientPrices.map((extraThing, index) => (
                      <label
                        key={index}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedExtras.some((e) => e.name === extraThing.name)
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name={extraThing.name}
                            checked={selectedExtras.some((e) => e.name === extraThing.name)}
                            onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                            className="w-4 h-4 text-orange-500 focus:ring-orange-500 mr-3"
                          />
                          <span>{extraThing.name}</span>
                        </div>
                        <span className="font-medium">+${extraThing.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="flex items-center justify-center gap-2 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                onClick={handleAddToCartButtonClick}
                type="button"
              >
                <ShoppingCart size={20} />
                Add to cart · ${selectedPrice.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  )
}
