"use client"

import { useState, useEffect } from "react"
import { useProfile } from "../../components/UseProfile"
import toast from "react-hot-toast"
import Link from "next/link"
import Image from "next/image"
import UserTabs from "../../components/layout/UserTabs"
import { PlusCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function MenuItemsPage() {
  const { loading, data, error } = useProfile()
  const [menuItems, setMenuItems] = useState([])
  const [menuLoading, setMenuLoading] = useState(true)

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch menu items")
        }
        return res.json()
      })
      .then((data) => {
        setMenuItems(data)
      })
      .catch((err) => {
        console.error("Error fetching menu items:", err)
        toast.error("Failed to load menu items")
      })
      .finally(() => setMenuLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <UserTabs />

      {/* Header Section */}
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold font-serif tracking-tight text-yellow-400">Menu Items</h1>
            <p className="mt-2 text-orange-500">Manage your restaurant's menu offerings</p>
          </div>
          <Link
            href="/menu-items/new"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create New Item</span>
          </Link>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        {loading || menuLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="rounded-xl overflow-hidden bg-white shadow-md">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                  </div>
                </div>
              ))}
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No menu items found</h3>
            <p className="mt-1 text-gray-500">Get started by creating your first menu item.</p>
            <div className="mt-6">
              <Link
                href="/menu-items/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create New Item</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <Link
                href={`/menu-items/edit/${item._id}`}
                key={item._id}
                className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    className="object-cover w-full h-48"
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={400}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-sm font-medium">Click to edit</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  {item.basePrice && (
                    <div className="mt-2 font-medium text-indigo-600">
                      ${Number.parseFloat(item.basePrice).toFixed(2)}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
