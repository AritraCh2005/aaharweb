"use client"

export default function AddressInputs({ addressProps, setAddressProp }) {
  const { phone, streetAddress, postalCode, city, country } = addressProps
  return (
    <>
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setAddressProp("phone", e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm text-black mb-4"
      />
      <input
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(e) => setAddressProp("streetAddress", e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm text-black mb-4"
      />
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setAddressProp("city", e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm text-black"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setAddressProp("postalCode", e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm text-black"
        />
      </div>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setAddressProp("country", e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm text-black"
      />
    </>
  )
}
