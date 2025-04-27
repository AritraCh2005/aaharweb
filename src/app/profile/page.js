// "use client";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import Image from "next/image";
// import { useState,useEffect } from "react";
// import Link from "next/link";
// import UserTabs from "../../components/layout/UserTabs";
// import EditableImage from "../../components/layout/EditableImage";
// import UserForm from "../../components/layout/UserForm"
// import toast from "react-hot-toast";



// export default function ProfilePage() {
//   const session = useSession();
//   const [saved, setSaved] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const[isAdmin,setIsAdmin]=useState(false)
//   const { status } = session;

//   const [user,setUser]=useState(null)

//   useEffect(() => {
//     if (status === "authenticated") {

//       fetch("/api/profile").then((response) => {
//         response.json().then((data) => {
//           console.log("Fetched Data:", data); // Debugging
//           setIsAdmin(data.admin);
//           setUser(data);
//         });
//       });
      
//     }
//   },[session,status]);

//   async function handleProfileInfoUpdate(ev,data) {
//     ev.preventDefault();
//     setSaved(false);
//     setIsSaving(true);

//     const response = await fetch("/api/profile", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     setIsSaving(false);

//     if (response.ok) {
//       setSaved(true);
//     }
//   }


//   if (status === "loading") { 
//     return "Loading...";
//   }

//   if (status === "unauthenticated") {
//     return redirect("/login");
//   }

//   const userImage=session.data.user.image ;
//   return (
//     <section className="mt-8 max-w-2xl mx-auto">
//       <UserTabs/>
//       {/* <div className="text-center text-red-500 text-4xl mb-4">Profile</div> */}

//       <div className="max-w-md mx-auto flex flex-col">
//         {saved && (
//           <h2 className="text-center bg-green-400 p-4 rounded-lg">
//             Profile Updated!
//           </h2>
//         )}
//         {isSaving && (
//           <h2 className="text-center bg-blue-400 p-4 rounded-lg">Saving...</h2>
//         )}
//         <UserForm user={user || { email: "" }} onSave={handleProfileInfoUpdate} />
//       </div>
//     </section>
//   );
// }


"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

import UserTabs from "../../components/layout/UserTabs";
import UserForm from "../../components/layout/UserForm";

export default function ProfilePage() {
  const { data: sessionData, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // fetch own profile by _id
  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/profile?_id=${sessionData.user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load profile");
          return res.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Could not load your profile");
        });
    }
  }, [status, sessionData]);

  async function handleProfileInfoUpdate(ev, formData) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _id: sessionData.user.id }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Profile updated!");
    } catch {
      toast.error("Could not save profile");
    } finally {
      setIsSaving(false);
    }
  }

  if (status === "loading" || user === null) {
    return <div className="text-center py-8">Loading your profile…</div>;
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs />
      <div className="mx-auto max-w-md flex flex-col space-y-4">
        {isSaving && (
          <div className="bg-blue-200 p-4 rounded text-center">Saving…</div>
        )}
        {saved && (
          <div className="bg-green-200 p-4 rounded text-center">
            Profile updated!
          </div>
        )}
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
