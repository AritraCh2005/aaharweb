


"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import UserTabs from "../../components/layout/UserTabs"
import UserForm from "../../components/layout/UserForm"
import toast from "react-hot-toast"
import { Loader2, AlertCircle, CheckCircle, RefreshCw, Info } from "lucide-react"

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
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading Profile</h2>
          <p className="text-gray-500 mb-6">Please wait while we fetch your information...</p>

          {/* {debugInfo && (
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-left">
              <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-1" /> Debug Information
              </h3>
              <div className="space-y-1 text-gray-600">
                <p>Session: {debugInfo.session?.exists ? "✅" : "❌"}</p>
                <p>Database: {debugInfo.mongoose?.connection === 1 ? "✅" : "❌"}</p>
              </div>
            </div>
          )} */}
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
        <div className="bg-white border border-red-200 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="font-bold text-lg text-red-700">Error Loading Profile</h3>
            </div>
          </div>

          <div className="p-6">
            <p className="text-red-600 mb-6 font-medium">{error}</p>

            {debugInfo && (
              <div className="bg-gray-50 p-4 rounded-lg text-sm mb-6">
                <h4 className="font-semibold mb-2 text-gray-700">Debug Information:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-40 text-gray-600">Environment:</span>
                    <span className="font-medium">{debugInfo.environment?.NODE_ENV}</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-40 text-gray-600">Database URL:</span>
                    <span
                      className={`font-medium ${debugInfo.environment?.MONGO_URL_EXISTS ? "text-green-600" : "text-red-600"}`}
                    >
                      {debugInfo.environment?.MONGO_URL_EXISTS ? "✅ Set" : "❌ Missing"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-40 text-gray-600">Database Connection:</span>
                    <span
                      className={`font-medium ${debugInfo.mongoose?.connection === 1 ? "text-green-600" : "text-red-600"}`}
                    >
                      {debugInfo.mongoose?.connection === 1 ? "✅ Connected" : "❌ Disconnected"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-40 text-gray-600">Session:</span>
                    <span className={`font-medium ${debugInfo.session?.exists ? "text-green-600" : "text-red-600"}`}>
                      {debugInfo.session?.exists ? "✅ Valid" : "❌ Invalid"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-40 text-gray-600">User Email:</span>
                    <span className="font-medium">{debugInfo.session?.email || "Not available"}</span>
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" /> Retry
              </button>
              <button
                onClick={fetchDebugInfo}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                <Info className="h-4 w-4 mr-2" /> Check Debug Info
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-800 to-green-700 rounded-t-xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-green-100 mt-1">Manage your account information</p>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg p-6 mb-8">
          <UserTabs isAdmin={isAdmin} />

          <div className="mt-8 max-w-2xl mx-auto">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {saved && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>Profile updated successfully!</p>
              </div>
            )}

            {isSaving && (
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-6 flex items-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                <p>Saving changes...</p>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
              <UserForm user={user || { email: session.data?.user?.email || "" }} onSave={handleProfileInfoUpdate} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
