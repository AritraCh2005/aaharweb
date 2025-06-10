import Image from "next/image"
import toast from "react-hot-toast"

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files
    if (files?.length === 1) {
      const data = new FormData()
      data.set("file", files[0])

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link)
          })
        }
        throw new Error("Something went wrong")
      })

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      })
    }
  }

  return (
    <>
      {link && (
        <Image
          className="w-full h-full object-cover"
          src={link || "/placeholder.svg"}
          width={300}
          height={300}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">No image</div>
      )}
    </>
  )
}
