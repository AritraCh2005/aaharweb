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

'use client';
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import toast from "react-hot-toast";
import DeleteButton from "../../components/DeleteButton";
import EditIcon from "../../components/icons/EditIcon";
import Trash from "../../components/icons/Trash";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  }

  return (
    <section className="container mt-8 max-w-2xl items-center mx-auto">
      <UserTabs isAdmin={true} />

      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex items-end gap-4">
          <div className="grow">
            <label>
              {editedCategory ? "Edit Category Name" : "Create New Category"}
              {editedCategory && <>: {editedCategory.name}</>}
            </label>
            <input
              type="text"
              className="font-serif"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              name="category"
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit">
              {editedCategory ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="text-white"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="bg-gray-100 rounded-xl p-2 px-8 flex gap-1 mb-1 items-center"
              style={{
                backgroundImage: "url('/texture-wooden-boards.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="grow font-serif font-bold text-black px-4 py-4">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  <EditIcon />
                </button>
                <div className="text-black">
                  <DeleteButton label={<Trash />} onDelete={() => handleDeleteClick(c._id)} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
