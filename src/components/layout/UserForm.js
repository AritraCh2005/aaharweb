"use client"

import { useProfile } from "../UseProfile"
import EditableImage from "./EditableImage"
import { useState, useEffect } from "react"
import AddressInputs from "../layout/AddressInputs"

export default function UserForm({ user, onSave }) {
  const [image, setImage] = useState(user?.image || "")
  const [userName, setUserName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "")
  const [city, setCity] = useState(user?.city || "")
  const [country, setCountry] = useState(user?.country || "")
  const [postalCode, setPostalCode] = useState(user?.postalCode || "")
  const [admin, setAdmin] = useState(user?.admin || false)

  function handleAddressChange(propName, value) {
    if (propName === "city") setCity(value)
    if (propName === "country") setCountry(value)
    if (propName === "postalCode") setPostalCode(value)
    if (propName === "streetAddress") setStreetAddress(value)
    if (propName === "phone") setPhone(value)
  }

  const { data: loggedInUserData } = useProfile()

  useEffect(() => {
    if (user) {
      setImage(user.image || "")
      setUserName(user.name || "")
      setPhone(user.phone || "")
      setStreetAddress(user.streetAddress || "")
      setCity(user.city || "")
      setCountry(user.country || "")
      setPostalCode(user.postalCode || "")
      setAdmin(user.admin || false)
    }
  }, [user])

  const handleSubmit = (ev) => {
    ev.preventDefault()
    onSave(ev, {
      name: userName,
      phone,
      streetAddress,
      city,
      country,
      postalCode,
      image,
      admin,
    })
  }

  return (
    <>
      <div
        className="rounded-xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: "url('/FormBg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="backdrop-blur-sm bg-white/30 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-40 h-40 bg-white/80">
                  <EditableImage link={image} setLink={setImage} />
                </div>
              </div>

              <form className="w-full md:w-2/3" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="First and last name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100/80 text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-5 mt-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-800">Address Information</h3>
                    <AddressInputs
                      addressProps={{ phone, streetAddress, city, postalCode, country }}
                      phone={phone}
                      streetAddress={streetAddress}
                      city={city}
                      postalCode={postalCode}
                      country={country}
                      setAddressProp={handleAddressChange}
                    />
                  </div>

                  {loggedInUserData?.admin && (
                    <div className="mt-6">
                      <label className="p-3 inline-flex items-center gap-2 border mb-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={admin}
                          onChange={(e) => setAdmin(e.target.checked)}
                          className="w-4 h-4 rounded"
                        />
                        <span className="font-medium">Admin</span>
                      </label>
                    </div>
                  )}

                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
