// 'use client'
// import Image from "next/image";
// import MenuItem from "../menu/MenuItem";
// import SectionHeaders from "./SectionHeaders";
// import { useEffect, useState } from "react";

// export default function HomeMenu() {

//   const[bestSellers,setBestSellers]=useState([]);

//   useEffect(() => {
//     fetch('/api/menu-items').then(res=>{
//       res.json().then(menuItems=>{
//         setBestSellers(menuItems.slice(-3));
//       });
//     });
//   },[]);


//   return (
//     <section className="">
//       <div className="absolute left-0 right-0 w-full justify-start">
//         <div className="h-48 w-48 absolute -left-12 text-left -top-12">
//           <Image
//             src={"/HalfPlate.png"}
//             layout={"fill"}
//             objectFit={"contain"}
//             alt={"sallad"}
//           />
//         </div>
//         <div className="h-48 w-48 absolute -right-12 -top-12">
//           <Image
//             src={"/HalfPlate.png"}
//             layout={"fill"}
//             objectFit={"contain"}
//             alt={"sallad"}
//           />
//         </div>
//       </div>
//       <div>
//         <SectionHeaders subHeader={'Check Out'}
//         mainHeader={'Our Best Sellers'}/>
//       </div>
      
//       <div className=" grid grid-cols-3 gap-4">
//         {bestSellers?.length>0 && bestSellers.map(item=>(
//           <MenuItem {...item}/>
//         ))}
//       </div>
//     </section>
//   );
// }

'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

  return (
    <section className="relative overflow-hidden">


      <div>
        <SectionHeaders subHeader={"Check Out"} mainHeader={"Latest Offers!!"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {bestSellers?.length > 0 &&
          bestSellers.map(item => (
            <MenuItem key={item.id} {...item} />
          ))}
      </div>
    </section>
  );
}
