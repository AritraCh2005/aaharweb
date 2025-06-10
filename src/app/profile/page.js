// "use client"
// import { useSession } from "next-auth/react"
// import { redirect } from "next/navigation"
// import { useState, useEffect } from "react"
// import UserTabs from "../../components/layout/UserTabs"
// import UserForm from "../../components/layout/UserForm"
// import toast from "react-hot-toast"

// export default function ProfilePage() {
//   const session = useSession()
//   const [user, setUser] = useState(null)
//   const [isAdmin, setIsAdmin] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [saved, setSaved] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const { status } = session

//   // Fetch profile data when authenticated
//   useEffect(() => {
//     if (status === "authenticated") {
//       setIsLoading(true)
//       fetch("/api/profile")
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Failed to fetch profile")
//           }
//           return response.json()
//         })
//         .then((data) => {
//           setUser(data)
//           setIsAdmin(!!data.admin)
//           setIsLoading(false)
//         })
//         .catch((err) => {
//           setError(err.message)
//           setIsLoading(false)
//         })
//     }
//   }, [session, status])

//   // Handle profile update
//   async function handleProfileInfoUpdate(ev, data) {
//     ev.preventDefault()
//     setSaved(false)
//     setIsSaving(true)
//     setError(null)

//     try {
//       const response = await fetch("/api/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to update profile")
//       }

//       // Refresh user data after successful update
//       const updatedUserResponse = await fetch("/api/profile")
//       if (updatedUserResponse.ok) {
//         const updatedUser = await updatedUserResponse.json()
//         setUser(updatedUser)
//         setIsAdmin(!!updatedUser.admin)
//       }

//       setSaved(true)
//       // Auto-hide success message after 3 seconds
//       setTimeout(() => {
//         setSaved(false)
//       }, 3000)
//     } catch (err) {
//       setError(err.message)
//       toast.error(err.message || "Failed to update profile")
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // Handle loading state
//   if (status === "loading" || (status === "authenticated" && isLoading)) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="animate-pulse text-amber-600 text-xl">Loading profile...</div>
//       </div>
//     )
//   }

//   // Handle unauthenticated state
//   if (status === "unauthenticated") {
//     return redirect("/login")
//   }

//   return (
//     <section className="mt-8 max-w-2xl mx-auto px-4">
//       <UserTabs />

//       <div className="max-w-md mx-auto mt-8">
//         {error && (
//           <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-4">
//             <p>{error}</p>
//           </div>
//         )}

//         {saved && <div className="bg-green-100 p-4 rounded-lg text-green-700 mb-4">Profile updated successfully!</div>}

//         {isSaving && <div className="bg-blue-100 p-4 rounded-lg text-blue-700 mb-4">Saving changes...</div>}

//         <UserForm user={user || { email: session.data?.user?.email || "" }} onSave={handleProfileInfoUpdate} />
//       </div>
//     </section>
//   )
// }


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
  const [debugInfo, setDebugInfo] = useState(null)
  const { status } = session

  // Debug function
  const fetchDebugInfo = async () => {
    try {
      const response = await fetch("/api/debug")
      const data = await response.json()
      setDebugInfo(data)
      console.log("Debug info:", data)
    } catch (err) {
      console.error("Failed to fetch debug info:", err)
    }
  }

  // Fetch profile data when authenticated
  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true)
      setError(null)

      // Fetch debug info first
      fetchDebugInfo()

      console.log("🔍 Fetching profile for user:", session.data?.user?.email)

      fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          console.log("📡 Profile response status:", response.status)

          const data = await response.json()
          console.log("📄 Profile response data:", data)

          if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`)
          }

          return data
        })
        .then((data) => {
          console.log("✅ Profile loaded successfully")
          setUser(data)
          setIsAdmin(!!data.admin)
          setError(null)
        })
        .catch((err) => {
          console.error("❌ Profile fetch error:", err)
          setError(err.message || "Failed to fetch profile")
          toast.error(err.message || "Failed to fetch profile")
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (status === "unauthenticated") {
      setIsLoading(false)
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

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || `HTTP error! status: ${response.status}`)
      }

      // Refresh user data after successful update
      const updatedUserResponse = await fetch("/api/profile")
      if (updatedUserResponse.ok) {
        const updatedUser = await updatedUserResponse.json()
        setUser(updatedUser)
        setIsAdmin(!!updatedUser.admin)
      }

      setSaved(true)
      toast.success("Profile updated successfully!")

      setTimeout(() => {
        setSaved(false)
      }, 3000)
    } catch (err) {
      console.error("Profile update error:", err)
      setError(err.message || "Failed to update profile")
      toast.error(err.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle loading state
  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-pulse text-amber-600 text-xl mb-4">Loading profile...</div>
          {debugInfo && (
            <div className="text-sm text-gray-600">
              <p>Session: {debugInfo.session?.exists ? "✅" : "❌"}</p>
              <p>Database: {debugInfo.mongoose?.connection === 1 ? "✅" : "❌"}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    return redirect("/login")
  }

  // Handle error state
  if (error && !user) {
    return (
      <section className="mt-8 max-w-2xl mx-auto px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-bold text-lg mb-2">Error loading profile</h3>
          <p className="mb-4">{error}</p>

          {debugInfo && (
            <div className="bg-gray-100 p-3 rounded text-sm mb-4">
              <h4 className="font-semibold mb-2">Debug Information:</h4>
              <ul className="space-y-1">
                <li>Environment: {debugInfo.environment?.NODE_ENV}</li>
                <li>Database URL: {debugInfo.environment?.MONGO_URL_EXISTS ? "✅ Set" : "❌ Missing"}</li>
                <li>
                  Database Connection: {debugInfo.mongoose?.connection === 1 ? "✅ Connected" : "❌ Disconnected"}
                </li>
                <li>Session: {debugInfo.session?.exists ? "✅ Valid" : "❌ Invalid"}</li>
                <li>User Email: {debugInfo.session?.email}</li>
              </ul>
            </div>
          )}

          <div className="space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
            <button
              onClick={fetchDebugInfo}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Check Debug Info
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto px-4">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-md mx-auto mt-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Profile updated successfully!
          </div>
        )}

        {isSaving && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            Saving changes...
          </div>
        )}

        <UserForm user={user || { email: session.data?.user?.email || "" }} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  )
}

