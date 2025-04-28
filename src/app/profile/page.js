"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import UserTabs from "../../components/layout/UserTabs"
import UserForm from "../../components/layout/UserForm"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const session = useSession()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { status } = session

  // Fetch profile data when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true)
      fetch("/api/profile")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch profile")
          }
          return response.json()
        })
        .then((data) => {
          setUser(data)
          setIsAdmin(!!data.admin)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setIsLoading(false)
        })
    }
  }, [session, status])

  // Handle profile update
  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault()
    setSaved(false)
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update profile")
      }

      // Refresh user data after successful update
      const updatedUserResponse = await fetch("/api/profile")
      if (updatedUserResponse.ok) {
        const updatedUser = await updatedUserResponse.json()
        setUser(updatedUser)
        setIsAdmin(!!updatedUser.admin)
      }

      setSaved(true)
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSaved(false)
      }, 3000)
    } catch (err) {
      setError(err.message)
      toast.error(err.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle loading state
  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-amber-600 text-xl">Loading profile...</div>
      </div>
    )
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    return redirect("/login")
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto px-4">
      <UserTabs />

      <div className="max-w-md mx-auto mt-8">
        {error && (
          <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-4">
            <p>{error}</p>
          </div>
        )}

        {saved && <div className="bg-green-100 p-4 rounded-lg text-green-700 mb-4">Profile updated successfully!</div>}

        {isSaving && <div className="bg-blue-100 p-4 rounded-lg text-blue-700 mb-4">Saving changes...</div>}

        <UserForm user={user || { email: session.data?.user?.email || "" }} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  )
}




// export default function ProfilePage() {
//   const session = useSession();
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [profileFetched, setProfileFetched] = useState(false);
//   const { status } = session;

//   useEffect(() => {
//     if (status === 'authenticated') {
//       fetch('/api/profile')
//         .then(response => response.json())
//         .then(data => {
//           setUser(data);
//           setIsAdmin(data.admin);
//           setProfileFetched(true);
//         })
//         .catch(error => {
//           console.error("Failed to fetch user profile:", error);
//           setProfileFetched(true);  // Ensure UI still loads
//         });
//     }
//   }, [session, status]);

//   async function handleProfileInfoUpdate(ev, data) {
//     ev.preventDefault();

//     const savingPromise = new Promise(async (resolve, reject) => {
//       const response = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) resolve();
//       else reject();
//     });

//     await toast.promise(savingPromise, {
//       loading: 'Saving...',
//       success: 'Profile saved!',
//       error: 'Error',
//     });

//     // Optionally refetch user data after update to reflect changes in UI
//     const updatedUser = await savingPromise;  // Fetch updated user data
//     setUser(updatedUser);  // Update state
//   }

//   if (status === 'loading' || !profileFetched) {
//     return 'Loading...';
//   }

//   if (status === 'unauthenticated') {
//     return redirect('/login');
//   }

//   return (
//     <section className="mt-8">
//       <UserTabs isAdmin={isAdmin} />
//       <div className="max-w-2xl mx-auto mt-8">
//       <UserForm user={user || { email: "" }} onSave={handleProfileInfoUpdate} />
//       </div>
//     </section>
//   );
// }