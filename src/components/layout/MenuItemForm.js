"use client"

import EditableImage from "./EditableImage"
import { useEffect, useState } from "react"
import MenuItemPriceProps from "./MenuItemPriceProps"
import toast from "react-hot-toast"

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [name, setName] = useState(menuItem?.name || "")
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "")
  const [description, setDescription] = useState(menuItem?.description || "")
  const [image, setImage] = useState(menuItem?.image || "")
  const [sizes, setSizes] = useState(menuItem?.sizes || [])
  const [categories, setCategories] = useState([])
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || [])
  const [category, setCategory] = useState(menuItem?.category || "")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories)
        setIsLoading(false)
      })
    })
  }, [])

  async function handleFileChange(ev) {
    const files = ev.target.files
    if (files?.length === 1) {
      const data = new FormData()
      data.set("file", files[0])

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImage(link)
          })
        }
        throw new Error("Something went wrong")
      })

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      })
    }
  }

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className="max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <div className="flex flex-col items-center">
          <div className="w-full aspect-square mb-4">
            <EditableImage link={image} setLink={setImage} />
          </div>

          {/* Edit Image Button - Added below the image */}
          <label className="mt-4">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <span className="block border border-gray-300 bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-2 px-4 text-center cursor-pointer transition-colors">
              Edit Image
            </span>
          </label>

          <p className="text-sm text-gray-500 text-center mt-2">Upload a high-quality image of your menu item</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Item name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="text-gray-800 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder="e.g. Margherita Pizza"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">Item Description</label>
              <textarea
                className="text-gray-800 border border-gray-300 p-3 rounded-lg w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="Describe your menu item in detail"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              {isLoading ? (
                <div className="flex items-center space-x-2 h-12 px-3">
                  <div className="w-4 h-4 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500">Loading categories...</p>
                </div>
              ) : (
                <select
                  className="text-gray-800 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  value={category}
                  onChange={(ev) => setCategory(ev.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categories?.length > 0 &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Base price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="text-gray-800 border border-gray-300 p-3 pl-8 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  value={basePrice}
                  onChange={(ev) => setBasePrice(ev.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <MenuItemPriceProps name={"Sizes"} addLabel={"Add item size"} props={sizes} setProps={setSizes} />

            <MenuItemPriceProps
              name={"Extra ingredients"}
              addLabel={"Add ingredient prices"}
              props={extraIngredientPrices}
              setProps={setExtraIngredientPrices}
            />
          </div>

          <div className="pt-6 border-t border-gray-200 mt-8">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-all font-medium w-full md:w-auto"
            >
              Save Menu Item
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
