"use client"

import { useEffect, useState } from "react"
import MenuItem from "../../components/menu/MenuItem"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MenuPage() {
  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch categories
        const categoriesRes = await fetch("/api/categories")
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)

        if (categoriesData.length > 0 && !activeCategory) {
          setActiveCategory(categoriesData[0]._id)
        }

        // Fetch menu items
        const menuItemsRes = await fetch("/api/menu-items")
        const menuItemsData = await menuItemsRes.json()
        setMenuItems(menuItemsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter menu items based on active category and search query
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = !activeCategory || item.category === activeCategory
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[url('/images/food-pattern-bg.png')] bg-repeat">
      <div className="min-h">
        <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl  text-red-500 font-serif font-bold mb-4">Our Menu</h1>
            <p className="text-lg font-serif font-bold text-yellow-400 max-w-full mx-auto">
              Discover our delicious offerings, made with the finest ingredients and prepared with care.
            </p>
          </div>

          {/* Search and filter section */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
  <Search className="h-5 w-5 text-gray-400" />
</div>

              <input
                type="text"
                placeholder="Search menu..."
                className="pl-10 pr-4 py-3 w-full text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-auto flex overflow-x-auto pb-2 sm:pb-0 gap-2 no-scrollbar">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                  !activeCategory ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200",
                )}
              >
                All Items
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategory(category._id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === category._id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200",
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* No results state */}
          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No menu items found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Menu items grid */}
          {!isLoading && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <MenuItem {...item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
