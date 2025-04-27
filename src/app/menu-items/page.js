"use client";

import { useState, useEffect } from "react";
import { useProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "../../components/icons/Right";
import Image from "next/image";
import UserTabs from "../../components/layout/UserTabs";

export default function MenuItemsPage() {
  const { loading, data, error } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu-items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch menu items");
        }
        return res.json();
      })
      .then((data) => {
        setMenuItems(data);
      })
      .catch((err) => {
        console.error("Error fetching menu items:", err);
        toast.error("Failed to load menu items");
      })
      .finally(() => setMenuLoading(false));
  }, []);

  if (loading || menuLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-600">Loading user info or menu...</span>
      </div>
    );
  }

  return (
    <>
      <UserTabs />

      {/* Items Section */}
      <section className="mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Edit Menu Items
          </h2>
          <p className="mt-1 text-gray-500">
            Manage your menu items here. Click on an item to edit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {menuItems.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={`/menu-items/edit/${item._id}`}
                key={item._id}
                className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
              >
                <div className="relative">
                  <Image
                    className="object-cover w-full h-48"
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={150}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description?.substring(0, 50)}...
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Create New Item Button Section */}
      <section className="mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <Link
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition-colors duration-300"
            href={"/menu-items/new"}
          >
            <div>Create New Item</div>
          </Link>
        </div>
      </section>
    </>
  );
}
