"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchIcon, CalendarIcon, Users } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/hotels?search=${searchQuery}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-gray-900 text-white flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg"
            alt="Syria Landscape"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in">
              Discover the Beauty of Syria
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200">
              Experience authentic Syrian hospitality in our carefully selected accommodations across the country's most beautiful destinations.
            </p>
            
            {/* Search Form */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-3xl">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="relative col-span-full md:col-span-1">
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 pl-10 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:text-white"
                  />
                  <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                
                <div className="relative">
                  <input
                    type="date"
                    placeholder="Check-in"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 pl-10 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:text-white"
                  />
                  <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                
                <div className="relative">
                  <input
                    type="date"
                    placeholder="Check-out"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    className="w-full p-3 pl-10 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:text-white"
                  />
                  <CalendarIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full p-3 pl-10 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 appearance-none dark:bg-gray-700 dark:text-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                
                <button
                  type="submit"
                  className="col-span-full md:col-span-1 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-md font-medium transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">Featured Destinations</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Explore Syria's most beautiful cities and historical sites
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Damascus", "Aleppo", "Palmyra", "Latakia"].map((city, index) => (
              <div key={index} className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-64">
                <img
                  src={`https://images.pexels.com/photos/${[338504, 2096983, 258154, 260922][index]}/pexels-photo-${[338504, 2096983, 258154, 260922][index]}.jpeg`}
                  alt={city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{city}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose CheckInSyria?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                CheckInSyria offers a curated selection of the finest accommodations across Syria, from luxury hotels to charming heritage homes.
              </p>
              <ul className="space-y-2">
                {[
                  "Authentic Syrian hospitality",
                  "Carefully selected accommodations",
                  "Best prices guaranteed",
                  "24/7 customer support",
                  "Local experiences and recommendations"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/hotels">
                <button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Browse Hotels
                </button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
                    alt="Syrian Hotel"
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg"
                    alt="Syrian Architecture"
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg"
                    alt="Syrian Landscape"
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg"
                    alt="Syrian Coast"
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">What Our Guests Say</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Hear from travelers who have experienced our hospitality
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "United Kingdom",
                quote: "My stay in Damascus was magical. The heritage hotel recommended by CheckInSyria was authentic and the staff was incredibly welcoming."
              },
              {
                name: "Ahmed Hassan",
                location: "Egypt",
                quote: "The booking process was seamless and the hotel exceeded my expectations. I'll definitely use CheckInSyria for my next visit."
              },
              {
                name: "Maria Rodriguez",
                location: "Spain",
                quote: "CheckInSyria helped me discover hidden gems in Aleppo that I wouldn't have found on my own. A truly memorable experience!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-300 font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore Syria?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Book your stay now and experience the rich culture, history, and hospitality of Syria.
          </p>
          <Link href="/hotels">
            <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors">
              Browse Hotels
            </button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CheckInSyria</h3>
              <p className="text-gray-400">
                Your gateway to authentic Syrian hospitality and accommodations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "Hotels", "About Us", "Contact", "FAQ"].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2">
                {["Damascus", "Aleppo", "Palmyra", "Latakia", "Homs"].map((city, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {city}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@checkinsyria.com</li>
                <li>Phone: +963 11 123 4567</li>
                <li>Address: Damascus, Syria</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} CheckInSyria. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {["facebook", "twitter", "instagram", "youtube"].map((social, index) => (
                <a 
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}