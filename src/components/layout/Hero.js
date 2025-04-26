


// import Image from "next/image";

// export default function Hero() {
//   return (
//     <section className="hero py-24 flex flex-col items-center text-center">
//       {/* Centered Heading */}
//       <h1 className="text-4xl font-serif text-green-400 mb-6 px-3">
//        Welcome to AAHAR!  
//       </h1>

//       {/* Centered Image */}
//       <div className="relative">
//         <Image
//           width={400}
//           height={400}
//           src="/biryani.png"
//           objectFit="contain"
//           alt="Biryani"
//         />
//       </div>
//     </section>
//   );
// }


"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Food images data
const foodImages = [
  { src: "/biryani.png", alt: "Delicious Biryani" },
  { src: "/chillichicken.jpeg", alt: "Spicy Chilli Chicken" },
  { src: "/noodles.png", alt: "Stir-Fried Noodles" },
  { src: "/paneer.png", alt: "Paneer Specialty" },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Avoid hydration issues
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Auto-slide
  useEffect(() => {
    if (!isLoaded) return
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % foodImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isLoaded])

  return (
    <section className="relative overflow-hidden bg-green-900 text-white px-8">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat"></div>

      {/* Centered container */}
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-0">
          {/* Text block */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              <span className="text-yellow-400">Authentic</span> Flavors, <br />
              <span className="text-yellow-400">Unforgettable</span> Meals
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-lg mx-auto md:mx-0">
              Experience the rich culinary traditions with our handcrafted dishes made from the finest ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/menu"
                className="bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2"
              >
                Order Now <ArrowRight size={20} />
              </Link>
              <Link
                href="/#about"
                className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image block */}
          <div className="md:w-1/2 flex justify-center md:justify-center">
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px]">
              {/* Glow layers */}
              <div className="absolute inset-0 rounded-full bg-yellow-400/20 -z-10"></div>
              <div className="absolute inset-0 rounded-full bg-green-400/20 -z-20"></div>
              <div className="absolute -inset-4 bg-yellow-400/30 rounded-full blur-xl -z-30"></div>

              {/* Rotating image */}
              {isLoaded && (
                <div className="relative overflow-hidden rounded-full w-full h-full">
                  <Image
                    src={foodImages[currentIndex].src}
                    alt={foodImages[currentIndex].alt}
                    fill
                    priority
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  )
}
