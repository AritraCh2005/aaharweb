// 'use client'

// import toast from "react-hot-toast";
// import UserForm from "../../../components/layout/UserForm"
// import UserTabs from "../../../components/layout/UserTabs";
// import { useProfile } from "../../../components/UseProfile" 
// import { useParams } from "next/navigation";
// import { useEffect } from "react";
// import { useState } from "react";



// export default function EditUserPage(){
//     const {loading,data}=useProfile();
//     const [user,setUser]=useState(null);
//     const {id}=useParams();


//     useEffect(() => {
//         fetch('/api/profile?_id='+id).then(res => {
//           res.json().then(user => {

//             setUser(user);
//           });
//         })
//       }, []);

//       async function handleSaveButtonClick(ev, data) {
//         ev.preventDefault();
//         const promise=new Promise(async(resolve,reject) => {
//           const res=await fetch('/api/profile', {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({...data, _id: id}),
//           });
//           if(res.ok){
//             resolve();
//           }
//           else  {
//             reject();
//           }
//         });
//         await toast.promise(promise, {
//           loading: 'Saving...',
//           success: 'Saved!',
//           error: 'Could not save',
//         }
//         )
//       }

  

//     if(loading) return <div>Loading...</div>
//     if(!data.admin){
//         return <div>You are not an admin</div>
//     }

//     return(
//         <section className="mt-8 mx-auto max-w-2xl">
//             <UserTabs isAdmin={true}/>
//             <div className="mt-8">
//                 <UserForm user={user} onSave={handleSaveButtonClick}/>
//             </div>
//         </section>
//     );
// }
"use client"

import toast from "react-hot-toast"
import { useSession } from "next-auth/react"
import { redirect, useParams } from "next/navigation"
import UserForm from "../../../components/layout/UserForm"
import UserTabs from "../../../components/layout/UserTabs"
import { useProfile } from "../../../components/UseProfile"
import { useEffect, useState } from "react"

export default function EditUserPage() {
  const { data: session, status } = useSession()
  const { loading, data } = useProfile()
  const [user, setUser] = useState(null)
  const { id } = useParams()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login")
    }
  }, [status])

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/profile?_id=${id}`)
        .then((res) => res.json())
        .then(setUser)
        .catch(() => toast.error("Failed to load user"))
    }
  }, [id, status])

  const handleSaveButtonClick = async (ev, formData) => {
    ev.preventDefault()
    const promise = fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, _id: id }),
    })

    await toast.promise(promise, {
      loading: "Saving...",
      success: "Saved!",
      error: "Could not save",
    })
  }

  // Show loading while checking authentication
  if (status === "loading" || loading) {
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

  // Admin check commented out - all authenticated users can access this page
  // if (!data?.admin) {
  //   return (
  //     <div className="bg-red-100 p-4 rounded-lg text-center text-red-700 max-w-md mx-auto mt-8">
  //       <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
  //       <p>Only administrators can edit other users.</p>
  //     </div>
  //   );
  // }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={data?.admin} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  )
}
