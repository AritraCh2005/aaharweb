"use client"

import { useProfile } from "../../../components/UseProfile"
import { useState } from "react"
import UserTabs from "../../../components/layout/UserTabs"
import Link from "next/link"
import Left from "../../../components/icons/Left"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"
import MenuItemForm from "../../../components/layout/MenuItemForm"

export default function NewMenuItemPage() {
  const [menuItems, setMenuItems] = useState([])
  const { loading, data } = useProfile()
  const [redirectToItems, setRedirectToItems] = useState(false)

  async function handleFormSubmit(ev, data) {
    ev.preventDefault()

    const { image, name, basePrice, description } = data // Extract data from the argument

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, name, basePrice, description }),
      })
      if (response.ok) {
        resolve()
      } else {
        reject()
      }
    })

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Saved!",
      error: "Could not save",
    })
    setRedirectToItems(true)
  }

  if (redirectToItems) return redirect("/menu-items")

  // Admin check is commented out but functionality is preserved
  // if (data && !data.admin) return <div>Access denied...not an admin</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserTabs isAdmin={true} />

      <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Create New Menu Item</h1>
              <p className="text-white/80 mt-1">Add a new dish to your restaurant's menu</p>
            </div>
            <Link
              href="/menu-items"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <span className="flex items-center justify-center">
                <Left />
              </span>
              <span>Back to menu items</span>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-10 h-10 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Loading menu item form...</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
        <p className="font-medium">Need help?</p>
        <p className="mt-1">
          Fill in all the details to create a new menu item. All fields marked with * are required.
        </p>
      </div>
    </div>
  )
}
