"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import UserTabs from "../../components/layout/UserTabs"
import { useProfile } from "../../components/UseProfile"
import toast from "react-hot-toast"
import DeleteButton from "../../components/DeleteButton"
import EditIcon from "../../components/icons/EditIcon"
import Trash from "../../components/icons/Trash"
import { Coffee, Utensils, ChefHat, Pizza } from "lucide-react"

export default function CategoriesPage() {
  const { data: session, status } = useSession()
  const { loading: profileLoading, data: profileData } = useProfile()
  const [categoryName, setCategoryName] = useState("")
  const [categories, setCategories] = useState([])
  const [editedCategory, setEditedCategory] = useState(null)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login")
    }
  }, [status])

  useEffect(() => {
    if (status === "authenticated") {
      fetchCategories()
    }
  }, [status])

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories)
      })
    })
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault()
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName }
      if (editedCategory) {
        data._id = editedCategory._id
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setCategoryName("")
      fetchCategories()
      if (response.ok) resolve()
      else reject()
    })
    await toast.promise(creationPromise, {
      loading: editedCategory ? "Updating category..." : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    })
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      })
      if (response.ok) {
        resolve()
      } else {
        reject()
      }
    })

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    })

    fetchCategories()
  }

  // Function to get a random food icon
  const getFoodIcon = (index) => {
    const icons = [
      <Pizza className="h-6 w-6" key="pizza" />,
      <Coffee className="h-6 w-6" key="coffee" />,
      <Utensils className="h-6 w-6" key="utensils" />,
      <ChefHat className="h-6 w-6" key="chef" />,
    ]
    return icons[index % icons.length]
  }

  // Show loading while checking authentication or profile
  if (status === "loading" || profileLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (status === "unauthenticated") {
    return null
  }

  // Check if user is admin
  // if (!profileData?.admin) {
  //   return (
  //     <div className="min-h-[60vh] flex items-center justify-center">
  //       <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
  //         <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
  //           <ChefHat className="h-8 w-8 text-red-600" />
  //         </div>
  //         <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
  //         <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
  //         <button
  //           onClick={() => window.history.back()}
  //           className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
  //         >
  //           Go Back
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-[#fcf9f2]">
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=300&width=1200')",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full flex items-center justify-center bg-black/40">
          <h1 className="text-4xl font-bold text-white font-serif">Menu Categories</h1>
        </div>
      </div>

      <section className="container max-w-4xl mx-auto px-4 py-8">
        <UserTabs isAdmin={profileData?.admin} />

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-amber-100">
          <div className="flex items-center mb-6">
            <ChefHat className="text-amber-600 mr-2 h-6 w-6" />
            <h2 className="text-2xl font-serif font-bold text-amber-800">
              {editedCategory ? "Edit Menu Category" : "Create New Menu Category"}
            </h2>
          </div>

          <form className="mb-8" onSubmit={handleCategorySubmit}>
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editedCategory && <span className="text-amber-600">Editing: {editedCategory.name}</span>}
                  {!editedCategory && <span>Category Name</span>}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 font-serif transition-all"
                  value={categoryName}
                  onChange={(ev) => setCategoryName(ev.target.value)}
                  name="category"
                  placeholder="e.g. Appetizers, Main Course, Desserts..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all font-medium flex items-center"
                >
                  {editedCategory ? "Update" : "Add Category"}
                </button>
                {editedCategory && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-all"
                    onClick={() => {
                      setEditedCategory(null)
                      setCategoryName("")
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-12">
            <h2 className="text-xl font-serif font-bold text-amber-800 mb-4 flex items-center">
              <Utensils className="text-amber-600 mr-2 h-5 w-5" />
              Current Menu Categories
            </h2>

            {categories?.length === 0 && (
              <div className="text-center py-8 text-gray-500 italic">
                No categories yet. Add your first menu category above.
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {categories?.length > 0 &&
                categories.map((c, index) => (
                  <div
                    key={c._id}
                    className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-amber-200 group"
                  >
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-amber-600 text-white p-2 rounded-full mr-3">{getFoodIcon(index)}</div>
                        <h3 className="font-serif font-bold text-lg text-amber-900">{c.name}</h3>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-200 rounded-full transition-colors"
                          onClick={() => {
                            setEditedCategory(c)
                            setCategoryName(c.name)
                          }}
                          aria-label="Edit category"
                        >
                          <EditIcon />
                        </button>
                        <div>
                          <DeleteButton
                            label={<Trash />}
                            onDelete={() => handleDeleteClick(c._id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
