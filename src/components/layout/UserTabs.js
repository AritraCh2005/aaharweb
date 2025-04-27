"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, ListIcon as Category, Menu, Users } from "lucide-react"

export default function UserTabs({ isAdmin }) {
  const path = usePathname()

  const tabs = [
    {
      label: "Profile",
      href: "/profile",
      icon: User,
      active: path === "/profile",
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
        // Comment out the isAdmin check as requested, but keep it in code
        // if (tab.admin && !isAdmin) return null;
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
