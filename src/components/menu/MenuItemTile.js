"use client"

import { ShoppingCart, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { name, basePrice, image, description, sizes, extraIngredientPrices } = item

  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0

  return (
    <div className="group relative rounded-xl transition-all duration-300 hover:shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col">
 {/* Increased width */}
      {/* Food image with gradient overlay */}
      <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
        <Image
          src={image || "/placeholder.svg"}
          alt={name || "Food item"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Price tag */}
        <div className="absolute top-3 right-3 max-w-[50%]">
          <div className="rounded-full bg-white px-3 py-1 text-sm font-bold text-orange-600 shadow-md truncate">
            {hasSizesOrExtras ? `From $${basePrice}` : `$${basePrice}`}
          </div>
        </div>

        {/* Item badges */}
        {hasSizesOrExtras && (
          <div className="absolute top-3 left-3">
            <div className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-medium text-white">
              {sizes?.length > 0 ? "Multiple sizes" : "Customizable"}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow bg-white p-4 rounded-b-xl">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors truncate">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-600 line-clamp-2 min-h-[3rem]">{description}</p>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onAddToCart}
            className="flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-orange-600 hover:shadow-md"
          >
            {hasSizesOrExtras ? (
              <>
                <span>Choose options</span>
                <ChevronRight size={16} />
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>Add to cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
