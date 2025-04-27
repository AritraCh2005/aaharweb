"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { User, ListIcon as Category, Menu, Users } from "lucide-react"

export default function UserTabs({ isAdmin }) {
  const path = usePathname()
  const { data: session } = useSession()
  const userId = session?.user?.id

  // Build dynamic profile href
  const profileHref = userId ? `/users/${userId}` : "/login"

  const tabs = [
    {
      label: "Profile",
      href: profileHref,
      icon: User,
      active: ["/profile", `/users/${userId}`].includes(path),
    },
    {
      label: "Categories",
      href: "/categories",
      icon: Category,
      admin: true,
      active: path === "/categories",
    },
    {
      label: "Menu Items",
      href: "/menu-items",
      icon: Menu,
      admin: true,
      active: path === "/menu-items",
    },
    {
      label: "Users",
      href: "/users",
      icon: Users,
      admin: true,
      active: path === "/users",
    },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
      {tabs.map((tab) => {
        // Uncomment to enforce admin check
        // if (tab.admin && !isAdmin) return null
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`
              flex items-center gap-1.5 px-4 py-2.5 rounded-full font-medium transition-all
              ${
                tab.active
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
