// "use client";

// import { useProfile } from "../useProfile";
// import EditableImage from "./EditableImage";
// import { useState } from "react";

// export default function UserForm({ user, onSave }) {
//   console.log(user);
//   const [image, setImage] = useState(user?.image || "");
//   const [userName, setUserName] = useState(user?.name || "");
//   const [saved, setSaved] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [phone, setPhone] = useState(user?.phone || "");
//   const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
//   const [city, setCity] = useState(user?.city || "");
//   const [country, setCountry] = useState(user?.country || "");
//   const [postalCode, setPostalCode] = useState(user?.postalCode || "");
//   const[admin,setAdmin]=useState(user?.admin||false)

//   const {data:loggedInUserData}=useProfile();

//   return (
//     <div className="flex gap-4 items-center">
//       <div>
//         <div className="rounded-lg">
//           <EditableImage link={image} setLink={setImage} />
//         </div>
//       </div>
//       <form
//         className="grow"
//         onSubmit={(ev) =>
//           onSave(ev, {
//             name: userName,
//             phone,
//             streetAddress,
//             city,
//             country,
//             postalCode,
//             image,
//             admin,
//           })
//         }
//       >
//         <input
//           type="text"
//           placeholder="First and last name"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <input type="email" value={user ? user.email : ""} disabled />
//         <input
//           type="tel"
//           placeholder="Phone number"
//           value={phone}
//           onChange={(ev) => setPhone(ev.target.value)}
//         ></input>

//         <input
//           type="text"
//           placeholder="Street Address"
//           value={streetAddress}
//           onChange={(ev) => setStreetAddress(ev.target.value)}
//         ></input>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="City"
//             value={city}
//             onChange={(ev) => setCity(ev.target.value)}
//           ></input>
//           <input
//             type="text"
//             placeholder="Postal Code"
//             value={postalCode}
//             onChange={(ev) => setPostalCode(ev.target.value)}
//           ></input>
//         </div>

//         <input
//           type="text"
//           placeholder="Country"
//           value={country}
//           onChange={(ev) => setCountry(ev.target.value)}
//         ></input>

//         {loggedInUserData.admin &&(
//           <div>
//           <label
//             className="p-2 inline-flex items-center gap-2 border mb-2"
//             htmlFor="adminCb"
//           >
//             <input id="adminCb" type="checkbox" className="" value={'1'}
//             checked={admin}
//             onClick={ev=>setAdmin(ev.target.checked)}
//             />
//             <span>Admin</span>
//           </label>
//         </div>
//         )}

//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import { useProfile } from "../UseProfile";
// import EditableImage from "./EditableImage";
// import { useState } from "react";
// import AddressInputs from "../layout/AddressInputs";
// import { useEffect } from "react";

// export default function UserForm({ user, onSave }) {
//   const [image, setImage] = useState(user?.image || "");
//   const [userName, setUserName] = useState(user?.name || "");
//   const [phone, setPhone] = useState(user?.phone || "");
//   const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
//   const [city, setCity] = useState(user?.city || "");
//   const [country, setCountry] = useState(user?.country || "");
//   const [postalCode, setPostalCode] = useState(user?.postalCode || "");
//   const [admin, setAdmin] = useState(user?.admin || false);

//   function handleAddressChange(propName, value) {
//     if (propName === "city") setCity(value);
//     if (propName === "country") setCountry(value);
//     if (propName === "postalCode") setPostalCode(value);
//     if (propName === "streetAddress") setStreetAddress(value);
//     if (propName === "phone") setPhone(value);
//   }

//   const { data: loggedInUserData } = useProfile();

//   useEffect(() => {
//     if (user) {
//       setImage(user.image || "");
//       setUserName(user.name || "");
//       setPhone(user.phone || "");
//       setStreetAddress(user.streetAddress || "");
//       setCity(user.city || "");
//       setCountry(user.country || "");
//       setPostalCode(user.postalCode || "");
//       setAdmin(user.admin || false);
//     }
//   }, [user]);

//   const handleSubmit = (ev) => {
//     ev.preventDefault();
//     onSave(ev, {
//       name: userName,
//       phone,
//       streetAddress,
//       city,
//       country,
//       postalCode,
//       image,
//       admin,
//     });
//   };

//   return (
//     <>
//     <div
//       className="flex gap-4 items-center bg-cover bg-center p-6 rounded-lg"
//       style={{
//         backgroundImage: "url('/FormBg.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//     <div className="gap-4 items-center">
//       <div>
//         <div className="rounded-lg">
//           <EditableImage link={image} setLink={setImage} />
//         </div>
//       </div>
//       <form className="grow" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="First and last name"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <input type="email" value={user?.email || ""} disabled />
//         {/* <input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
//         <input type="text" placeholder="Street Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
//         <div className="flex gap-4">
//           <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
//           <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
//         </div>
//         <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} /> */}

//         <AddressInputs
//           addressProps={{ phone, streetAddress, city, postalCode, country }}
//           phone={phone}
//           streetAddress={streetAddress}
//           city={city}
//           postalCode={postalCode}
//           country={country}
//           setAddressProp={handleAddressChange}
//         />
//         {loggedInUserData?.admin && (
//           <label className="p-2 inline-flex items-center gap-2 border mb-2 bg-red-600 text-white">
//             <input
//               type="checkbox"
//               checked={admin}
//               onChange={(e) => setAdmin(e.target.checked)}
//             />
//             <span>Admin</span>
//           </label>
//          )} 
//         <button type="submit">Save</button>
//       </form>
//     </div>
//     </div>
//     </>
//   );
// }

"use client"

import { useState, useEffect } from "react"
import { useProfile } from "../UseProfile"
import EditableImage from "./EditableImage"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

export default function UserForm({ user, onSave, isSaving }) {
  const [image, setImage] = useState(user?.image || "")
  const [userName, setUserName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "")
  const [city, setCity] = useState(user?.city || "")
  const [country, setCountry] = useState(user?.country || "")
  const [postalCode, setPostalCode] = useState(user?.postalCode || "")
  const [admin, setAdmin] = useState(user?.admin || false)

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 flex flex-col items-center space-y-3">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <p className="text-sm text-slate-500">Click to edit</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user?.email || ""} disabled className="bg-slate-50 max-w-md" />
          </div>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="max-w-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input
              id="streetAddress"
              type="text"
              placeholder="Your street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="Your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                type="text"
                placeholder="Your postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              placeholder="Your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>
      </div>

      {loggedInUserData?.admin && (
        <div className="border-t pt-6 mt-6">
          <div className="flex items-center space-x-2 bg-red-50 p-4 rounded-lg">
            <Checkbox id="admin" checked={admin} onCheckedChange={(checked) => setAdmin(!!checked)} />
            <Label htmlFor="admin" className="text-red-700 font-medium cursor-pointer">
              Admin privileges
            </Label>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button type="submit" className="px-6" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Profile"
          )}
        </Button>
      </div>
    </form>
  )
}


