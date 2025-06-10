"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import UserTabs from "../../components/layout/UserTabs"
import { useProfile } from "../../components/UseProfile"
import Link from "next/link"
import { User, ChefHat, Calendar, Mail } from "lucide-react"

export default function UsersPage() {
  const { data: session, status } = useSession()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { loading, data } = useProfile()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login")
    }
  }, [status])

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true)
      fetch("/api/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users")
          }
          return response.json()
        })
        .then((users) => {
          setUsers(users)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setIsLoading(false)
        })
    }
  }, [status])

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
  //       <p>Only administrators can access this page.</p>
  //     </div>
  //   );
  // }

  return (
    <section className="max-w-4xl mx-auto mt-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-500 mb-2">Staff & User Management</h1>
        <p className="text-yellow-300">Manage your restaurant staff and user accounts</p>
      </div>

      <UserTabs isAdmin={data?.admin} />

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-pulse text-amber-600">Loading staff information...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 p-4 rounded-lg text-center text-red-700 my-4">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && users.length === 0 && (
        <div className="text-center py-8 bg-amber-50 rounded-lg">
          <p className="text-gray-600">No staff members found</p>
        </div>
      )}

      <div className="grid gap-4">
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow"
            >
              <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-amber-700" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 grow">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      {!!user.name ? (
                        <p className="font-medium text-gray-800">{user.name}</p>
                      ) : (
                        <p className="italic text-gray-400">No name provided</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-medium text-gray-800">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:ml-auto">
                  <Link
                    className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                    href={"/users/" + user._id}
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
