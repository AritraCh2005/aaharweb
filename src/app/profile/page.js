"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import UserTabs from "@/components/layout/UserTabs"
import UserForm from "@/components/layout/UserForm"
import { toast } from "react-hot-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const session = useSession()
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { status } = session
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setIsAdmin(data.admin)
          setUser(data)
        })
      })
    }
  }, [session, status])

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault()
    setSaved(false)
    setIsSaving(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSaved(true)
        toast.success("Profile updated successfully!")
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return redirect("/login")
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-8 pb-12">
          <UserTabs />

          <div className="max-w-3xl mx-auto mt-8">
            {saved && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-5 duration-500">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <p className="text-green-700 font-medium flex items-center justify-center">
                      Profile updated successfully!
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card className="shadow-md border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <UserForm user={user || { email: "" }} onSave={handleProfileInfoUpdate} isSaving={isSaving} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
