"use client";
export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import UserTabs from "../../components/layout/UserTabs";
import UserForm from "../../components/layout/UserForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/profile?_id=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.admin);
          setUser(data);
        })
        .catch(() => toast.error("Could not load profile"));
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(ev, formData) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _id: session.user.id }),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      toast.success("Profile updated!");
    } catch {
      toast.error("Could not save");
    } finally {
      setIsSaving(false);
    }
  }

  if (status === "loading" || !user) {
    return (
      <div className="text-center py-8">
        Loading…
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs />
      <div className="max-w-md mx-auto flex flex-col space-y-4">
        {isSaving && (
          <div className="bg-blue-200 p-4 rounded text-center">
            Saving…
          </div>
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
