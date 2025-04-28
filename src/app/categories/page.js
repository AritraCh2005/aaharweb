// "use client";
// import { useEffect, useState } from "react";
// import UserTabs from "../../components/layout/UserTabs";
// import { useProfile } from "../../components/useProfile";
// import toast from "react-hot-toast";
// import DeleteButton from "../../components/DeleteButton";
// import EditIcon from "../../components/icons/EditIcon";

// export default function CategoriesPage() {
//   const [categoryName, setCategoryName] = useState("");
//   const [categories, setCategories] = useState([]);
//   const { loading: profileLoading, data: profileData } = useProfile();
//   const [editedCategory, setEditedCategory] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   function fetchCategories() {
//     fetch("/api/categories").then((res) => {
//       res.json().then((categories) => {
//         setCategories(categories);
//       });
//     });
//   }

//   async function handleCategorySubmit(ev) {
//     ev.preventDefault();
//     const creationPromise = new Promise(async (resolve, reject) => {
//       const data = { name: categoryName };
//       if (editedCategory) {
//         data._id = editedCategory._id;
//       }
//       const response = await fetch("/api/categories", {
//         method: editedCategory ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       setCategoryName("");
//       fetchCategories();
//       // setEditedCategory(null);
//       if (response.ok) resolve();
//       else reject();
//     });
//     await toast.promise(creationPromise, {
//       loading: editedCategory
//         ? "Updating category..."
//         : "Creating your new category...",
//       success: editedCategory ? "Category updated" : "Category created",
//       error: "Error, sorry...",
//     });
//   }

//   async function handleDeleteClick(_id) {
//     const promise = new Promise(async (resolve, reject) => {
//       const response = await fetch("/api/categories?_id=" + _id, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         resolve();
//       } else {
//         reject();
//       }
//     });

//     await toast.promise(promise, {
//       loading: "Deleting...",
//       success: "Deleted",
//       error: "Error",
//     });

//     fetchCategories();
//   }

//   if (profileLoading) {
//     return <div>Loading user info...</div>;
//   }
//   if (!profileData.admin) {
//     return <div>You are not authorized to view this page</div>;
//   }

//   return (
//     <section className="container mt-8 max-w-2xl items-center mx-auto ">
//       <UserTabs isAdmin={true} />

//       <form className="mt-8" onSubmit={handleCategorySubmit}>
//         <div className="flex items-end gap-4">
//           <div className="grow">
//             <label>
//               {editedCategory ? "Edit Category Name" : "Create New Category"}
//               {editedCategory && <>: {editedCategory.name}</>}
//             </label>
//             <input
//               type="text"
//               className="font-serif"
//               value={categoryName}
//               onChange={(ev) => setCategoryName(ev.target.value)}
//               name="category"
//             />
//           </div>
//           <div className="pb-2 flex gap-2">
//             <button type="submit">{editedCategory ? "Update" : "Add"}</button>
//             <button
//               type="button"
//               className="text-white"
//               onClick={() => {
//                 setEditedCategory(null);
//                 setCategoryName("");
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </form>
//       <div>
        
//           <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
//           {categories?.length > 0 &&
//             categories.map((c) => (
//               <div
//                 key={c._id}
//                 className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center"
//               >
//                 <div className="grow font-serif font-bold">{c.name}</div>
//                 <div className="flex gap-1">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setEditedCategory(c);
//                       setCategoryName(c.name);
//                     }}
//                   >
//                     <EditIcon />
//                   </button>
//                   <DeleteButton
//                     label="Delete"
//                     onDelete={() => handleDeleteClick(c._id)}
//                   />
//                 </div>
//               </div>
//             ))}
//         </div>
//     </section>
//   );
// }

// 'use client';
// import { useEffect, useState } from "react";
// import UserTabs from "../../components/layout/UserTabs";
// import { useProfile } from "../../components/UseProfile";
// import toast from "react-hot-toast";
// import DeleteButton from "../../components/DeleteButton";
// import EditIcon from "../../components/icons/EditIcon";
// import Trash from "../../components/icons/Trash";

// export default function CategoriesPage() {
//   const [categoryName, setCategoryName] = useState("");
//   const [categories, setCategories] = useState([]);
//   const { loading: profileLoading, data: profileData } = useProfile();
//   const [editedCategory, setEditedCategory] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   function fetchCategories() {
//     fetch("/api/categories").then((res) => {
//       res.json().then((categories) => {
//         setCategories(categories);
//       });
//     });
//   }

//   async function handleCategorySubmit(ev) {
//     ev.preventDefault();
//     const creationPromise = new Promise(async (resolve, reject) => {
//       const data = { name: categoryName };
//       if (editedCategory) {
//         data._id = editedCategory._id;
//       }
//       const response = await fetch("/api/categories", {
//         method: editedCategory ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       setCategoryName("");
//       fetchCategories();
//       if (response.ok) resolve();
//       else reject();
//     });
//     await toast.promise(creationPromise, {
//       loading: editedCategory
//         ? "Updating category..."
//         : "Creating your new category...",
//       success: editedCategory ? "Category updated" : "Category created",
//       error: "Error, sorry...",
//     });
//   }

//   async function handleDeleteClick(_id) {
//     const promise = new Promise(async (resolve, reject) => {
//       const response = await fetch("/api/categories?_id=" + _id, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         resolve();
//       } else {
//         reject();
//       }
//     });

//     await toast.promise(promise, {
//       loading: "Deleting...",
//       success: "Deleted",
//       error: "Error",
//     });

//     fetchCategories();
//   }

//   if (profileLoading) {
//     return <div>Loading user info...</div>;
//   }
//   if (!profileData.admin) {
//     return <div>You are not authorized to view this page</div>;
//   }

//   return (
//     <section className="container mt-8 max-w-2xl items-center mx-auto">
//       <UserTabs isAdmin={true} />

//       <form className="mt-8" onSubmit={handleCategorySubmit}>
//         <div className="flex items-end gap-4">
//           <div className="grow">
//             <label>
//               {editedCategory ? "Edit Category Name" : "Create New Category"}
//               {editedCategory && <>: {editedCategory.name}</>}
//             </label>
//             <input
//               type="text"
//               className="font-serif"
//               value={categoryName}
//               onChange={(ev) => setCategoryName(ev.target.value)}
//               name="category"
//             />
//           </div>
//           <div className="pb-2 flex gap-2">
//             <button type="submit">
//               {editedCategory ? "Update" : "Add"}
//             </button>
//             <button
//               type="button"
//               className="text-white"
//               onClick={() => {
//                 setEditedCategory(null);
//                 setCategoryName("");
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </form>
//       <div>
//         <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
//         {categories?.length > 0 &&
//           categories.map((c) => (
//             <div
//               key={c._id}
//               className="bg-gray-100 rounded-xl p-2 px-8 flex gap-1 mb-1 items-center"
//               style={{
//                 backgroundImage: "url('/texture-wooden-boards.jpg')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <div className="grow font-serif font-bold text-black px-4 py-4">{c.name}</div>
//               <div className="flex gap-1">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setEditedCategory(c);
//                     setCategoryName(c.name);
//                   }}
//                 >
//                   <EditIcon />
//                 </button>
//                 <div className="text-black">
//                 <DeleteButton label={<Trash/>} onDelete={() => handleDeleteClick(c._id)} />
//                   </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </section>
//   );
// }

"use client"
import { useEffect, useState } from "react"
import UserTabs from "../../components/layout/UserTabs"
import toast from "react-hot-toast"
import DeleteButton from "../../components/DeleteButton"
import EditIcon from "../../components/icons/EditIcon"
import Trash from "../../components/icons/Trash"
import { Coffee, Utensils, ChefHat, Pizza } from "lucide-react"

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("")
  const [categories, setCategories] = useState([])
  const [editedCategory, setEditedCategory] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [])

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
        <UserTabs isAdmin={true} />

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
