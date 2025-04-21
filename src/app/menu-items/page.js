// "use client";
// import { useState, useEffect } from "react";
// import EditableImage from "../../components/layout/EditableImage";
// import UserTabs from "../../components/layout/UserTabs";
// import { useProfile } from "../../components/UseProfile";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import Right from "../../components/icons/Right";
// import MenuItem from "../../components/menu/MenuItem";
// import Image from "next/image";

// export default function MenuItemsPage() {
//   const { loading, data } = useProfile();
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     fetch("/api/menu-items").then((res) => {
//       res.json().then((menuItems) => {
//         setMenuItems(menuItems);
//       });
//     });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <span className="text-gray-600">Loading user info...</span>
//       </div>
//     );
//   }

//   if (!data.admin) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <span className="text-red-500">Not an admin.</span>
//       </div>
//     );
//   }

//   return (
//     <>
//     <UserTabs isAdmin={true} />
    


//       <section className="mt-8 max-w-2xl mx-auto">
//       <div>
//         <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
//         <div className="grid grid-cols-3 gap-2">
//         {menuItems.length > 0 &&
//           menuItems.map((item) => (
//             <Link
//               href={"/menu-items/edit/" + item._id}
//               className="bg-gray-200 rounded-lg p-4"
//               key={item.id}
//             >
//               <div className="relative">
//                 <Image className="rounded-md" src={item.image} alt={""} width={100} height={100} />
//               </div>
//               <div className="text-center">
//                 {item.name}
//               </div>
              
//             </Link>
//           ))}

//         </div>
       
//       </div>
//     </section>
//     <section className="mt-8 max-w-xs mx-auto">
      
//       <div className="mt-8">
//         <Link className="button bg-blue-700 text-white" 
//         style={{ paddingLeft: '16px', paddingRight: '16px', marginX: '20px' }}
//         href={"/menu-items/new"}>
//           <div className="text-white">Create new item</div>

//           <Right />
//         </Link>
//       </div>
//     </section>
//     </>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import EditableImage from "../../components/layout/EditableImage";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "../../components/icons/Right";
import Image from "next/image";

export default function MenuItemsPage() {
  const { loading, data, error } = useProfile(); // Add error if your hook returns it
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true); // loading state for menu items

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }
        return res.json();
      })
      .then((data) => {
        setMenuItems(data);
      })
      .catch((err) => {
        console.error("Error fetching menu items:", err);
        toast.error("Failed to load menu items");
      })
      .finally(() => setMenuLoading(false));
  }, []);

  // Debug log
  console.log("Loading:", loading);
  console.log("Data:", data);

  if (loading || menuLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-600">Loading user info or menu...</span>
      </div>
    );
  }

  // if (!data?.admin) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <span className="text-red-500">Not an admin.</span>
  //     </div>
  //   );
  // }

  return (
    <>
      <UserTabs /*isAdmin={true}*/ />

      <section className="mt-8 max-w-2xl mx-auto">
        <div>
          <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
          <div className="grid grid-cols-3 gap-2">
            {menuItems.length > 0 &&
              menuItems.map((item) => (
                <Link
                  href={`/menu-items/edit/${item._id}`}
                  className="bg-gray-200 rounded-lg p-4"
                  key={item._id}
                >
                  <div className="relative">
                    <Image
                      className="rounded-md"
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="text-center">{item.name}</div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="mt-8 max-w-xs mx-auto">
        <div className="mt-8">
          <Link
            className="button bg-blue-700 text-white px-4 py-2 rounded"
            href={"/menu-items/new"}
          >
            <div className="text-white">Create new item</div>
            <Right />
          </Link>
        </div>
      </section>
    </>
  );
}
