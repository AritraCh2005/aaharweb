"use client";

import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((newLink) => {
            setLink(newLink);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    }
  }

  return (
    <>
      {/* Image preview or placeholder */}
      {link ? (
        <Image
          className="rounded-lg w-full h-full"
          src={link}
          width={300}
          height={300}
          alt="avatar"
        />
      ) : (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg w-full h-full">
          No image
        </div>
      )}

      {/* Change image button, placed below with margin */}
      <div className="mt-2 w-full text-center">
        <label className="inline-block cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <span className="inline-block border border-gray-300 bg-blue-700 text-white rounded-lg px-4 py-2">
            Change image
          </span>
        </label>
      </div>
    </>
  );
}
