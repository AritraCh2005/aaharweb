"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { User, ListIcon as Category, Menu, Users } from "lucide-react"

export default function UserTabs({ isAdmin }) {
  const path = usePathname()
  const { data: session } = useSession()
  const userId = session?.user?.id

  const tabs = [
    {
      label: "Profile",
      href: "/profile",
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
                  ? "bg-red-600 text-white shadow-lg shadow-red-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
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
