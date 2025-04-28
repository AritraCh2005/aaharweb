"use client"

import { useProfile } from "../../../../components/UseProfile"
import { useState, useEffect } from "react"
import UserTabs from "../../../../components/layout/UserTabs"
import Link from "next/link"
import Left from "../../../../components/icons/Left"
import toast from "react-hot-toast"
import { redirect, useParams } from "next/navigation"
import MenuItemForm from "../../../../components/layout/MenuItemForm"
import DeleteButton from "../../../../components/DeleteButton"

export default function EditMenuItemPage() {
  const { id } = useParams()
  const [menuItem, setMenuItem] = useState(null)
  const { data } = useProfile()
  const [redirectToItems, setRedirectToItems] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch("/api/menu-items")
      .then((res) => res.json())
      .then((items) => {
        const item = items.find((i) => i._id === id)
        setMenuItem(item)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch menu item:", error)
        setIsLoading(false)
        toast.error("Failed to load menu item")
      })
  }, [id])

  async function handleFormSubmit(ev, data) {
    ev.preventDefault()
    data = { ...data, _id: id }

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        resolve()
      } else {
        reject()
      }
    })

    await toast.promise(savingPromise, {
      loading: "Saving changes...",
      success: "Menu item updated!",
      error: "Could not update menu item",
    })
    setRedirectToItems(true)
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      })
      if (res.ok) resolve()
      else reject()
    })

    await toast.promise(promise, {
      loading: "Deleting menu item...",
      success: "Menu item deleted successfully",
      error: "Failed to delete menu item",
    })

    setRedirectToItems(true)
  }

  if (redirectToItems) return redirect("/menu-items")

  if (data && !data.admin) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>You don't have admin privileges to edit menu items.</p>
          <Link href="/" className="inline-block mt-4 text-primary font-medium hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserTabs isAdmin={true} />

      <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Menu Item</h1>
              <p className="text-white/80 mt-1">Update the details of your menu item</p>
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
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-10 h-10 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Loading menu item details...</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {menuItem ? (
              <>
                <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="max-w-md mx-auto">
                    <DeleteButton
                      label="Delete this menu item"
                      onDelete={handleDeleteClick}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg w-full flex items-center justify-center gap-2"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="text-amber-500 mb-4">⚠️</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Menu item not found</h2>
                <p className="text-gray-600 mb-4">
                  The menu item you're trying to edit doesn't exist or has been deleted.
                </p>
                <Link href="/menu-items" className="inline-flex items-center gap-2 text-primary hover:underline">
                  <Left className="w-4 h-4" />
                  <span>Return to menu items</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
        <p className="font-medium">Need help?</p>
        <p className="mt-1">Update the details of your menu item. All fields marked with * are required.</p>
      </div>
    </div>
  )
}
