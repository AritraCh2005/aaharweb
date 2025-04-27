// import Hero from "../components/layout/Hero";
// import Header from "../components/layout/Headers"  // Corrected path
// import HomeMenu from "../components/layout/HomeMenu";
// import SectionHeaders from "../components/layout/SectionHeaders";

// export default function Home() {
//   return (
    
//     <>
      
//       <Hero/>
//       <HomeMenu/>
//       <section className="text-center my-16" id="about">
//        <SectionHeaders subHeader={'Our Vision'}
//        mainHeader={'About'}
//        />
//        <div className="max-w-md mx-auto mt-4 text-white flex-col gap-4">
//        <p >
//         lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quod.qch ih ihqicj hehcqi ihiec ihqicj opdguecuhoi
//         ecghhiwjeocoq
//        </p>
//        <p >
//         lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quod.qch ih ihqicj hehcqi ihiec ihqicj opdguecuhoi
//         ecghhiwjeocoq
//        </p>
//        <p >
//         lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quod.qch ih ihqicj hehcqi ihiec ihqicj opdguecuhoi
//         ecghhiwjeocoq
//        </p>
//        </div>
       
//       </section>
//       <section className="text-center mt-8" id="contact">
//         <SectionHeaders subHeader={'Don\'t Hesitate'}
//        mainHeader={'Contact Us'}
//        />
//        <div className="my-8">
//        <a className="text-2xl underline text-gray-700"href="tel:+923321234567">
//         +923321234567
//        </a>
//        </div>
       
//       </section>
      
//     </>
//   );
// }


import Hero from "../components/layout/Hero"
import HomeMenu from "../components/layout/HomeMenu"
import SectionHeaders from "../components/layout/SectionHeaders"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Hero />

      {/* Decorative element */}
      <div className="relative">
        <div className="absolute left-0 right-0 h-24 bg-gradient-to-b from-green-800/10 to-transparent -top-12 z-10"></div>
      </div>

      {/* Menu section with enhanced styling */}
      <div className="bg-gradient-to-b from-yellow-50/30 to-white py-8 px-12">
        <HomeMenu />
      </div>

      {/* About section with enhanced styling */}
      <section className="relative py-16 px-4" id="about">
        <div className="absolute inset-0 bg-green-900/90 -z-10"></div>
        <div className="absolute inset-0 opacity-10 -z-10 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat"></div>

        <SectionHeaders subHeader={"Our Vision"} mainHeader={"About Us"} />

        <div className="max-w-3xl mx-auto mt-8 text-white">
          <div className="bg-black/20 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative h-64 w-64 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-yellow-animate-pulse"></div>
                  <Image src="/aahar.jpeg" alt="About Us" width={250} height={250} className="relative z-20" />
                </div>
              </div>

              <div className="md:w-2/3 space-y-4">
                <p className="text-lg leading-relaxed">
                  At AAHAR, we believe that great food brings people together. Our passion for authentic flavors and
                  traditional recipes drives us to create memorable dining experiences.
                </p>
                <p className="text-lg leading-relaxed">
                  Every dish is crafted with love using the freshest ingredients, honoring culinary traditions while
                  embracing innovation.
                </p>
                <p className="text-lg leading-relaxed">
                  Our mission is to serve not just food, but moments of joy and connection that you'll cherish long
                  after your meal.
                </p>

                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-green-900 px-6 py-3 rounded-full font-medium mt-4 hover:bg-yellow-300 transition-colors"
                >
                  Explore Our Menu <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section with enhanced styling */}
      <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white" id="contact">
        <SectionHeaders subHeader={"Don't Hesitate"} mainHeader={"Contact Us"} />

        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="text-green-600" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-green-800">Call Us</h3>
              <a className="text-xl text-green-600 hover:underline" href="tel:+923321234567">
                +92 332 123 4567
              </a>
              <p className="text-gray-500 mt-2">Available 9am - 10pm</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-green-800">Email Us</h3>
              <a className="text-xl text-green-600 hover:underline" href="mailto:info@aahar.com">
                info@aahar.com
              </a>
              <p className="text-gray-500 mt-2">We reply within 24 hours</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-green-600" size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-green-800">Visit Us</h3>
              <p className="text-green-600">123 Food Street, Cuisine City</p>
              <p className="text-gray-500 mt-2">Open daily 9am - 10pm</p>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 px-4 bg-green-50">
        <SectionHeaders subHeader={"What People Say"} mainHeader={"Testimonials"} />

        <div className="max-w-6xl mx-auto mt-12">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md relative">
                <div className="absolute -top-4 left-6 text-6xl text-yellow-400">"</div>
                <div className="pt-4">
                  <p className="text-gray-600 italic mb-4">
                    The food at AAHAR is absolutely delicious! The biryani is authentic and the service is excellent.
                    Highly recommend!
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">{String.fromCharCode(64 + i)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800">Customer {i}</h4>
                      <p className="text-gray-500 text-sm">Regular Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with decorative element */}
      <div className="bg-green-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-yellow-400 mb-4">AAHAR</h2>
          <p className="text-gray-300 mb-6">Delicious food, delivered with love</p>
          <div className="flex justify-center space-x-6 mb-8">
            {["Facebook", "Instagram", "Twitter"].map((social) => (
              <a key={social} href="#" className="text-gray-300 hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} AAHAR. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}
