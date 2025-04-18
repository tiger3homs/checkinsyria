"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { getHotelById, getRoomsByHotelId } from "@/lib/data";
import { Hotel, Room } from "@/types";
import RoomCard from "@/components/RoomCard";
import BookingForm from "@/components/BookingForm";
import { ChevronLeft, MapPin, Star, ChevronRight, User2, BedDouble, Languages as Language, Wifi, Utensils, Info } from "lucide-react";

export default function HotelDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  // Fetch hotel data
  const hotel = id ? getHotelById(id as string) : undefined;
  const rooms = id ? getRoomsByHotelId(id as string) : [];
  
  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[70vh]">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <Info className="h-16 w-16 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Hotel Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The hotel you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/hotels")}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Back to Hotels
          </button>
        </div>
      </div>
    );
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
  };
  
  const handleBookNow = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setSelectedRoom(room);
      setShowBookingForm(true);
      
      // Scroll to booking form
      setTimeout(() => {
        document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/hotels")}
        className="flex items-center text-teal-600 dark:text-teal-400 hover:underline mb-4"
      >
        <ChevronLeft size={20} />
        <span>Back to Hotels</span>
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        {/* Image Gallery */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={hotel.images[currentImageIndex]}
            alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Image Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={prevImage}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity rounded-full p-2 text-white focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity rounded-full p-2 text-white focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {hotel.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Hotel Information */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{hotel.name}</h1>
              <div className="flex items-center mb-2">
                <MapPin size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{hotel.location}</span>
              </div>
              <div className="flex items-center">
                <Star size={18} className="text-amber-500 mr-1" />
                <span className="text-gray-700 dark:text-gray-300">{hotel.rating} rating</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
              <div className="flex items-baseline mb-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">${hotel.price}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">/ night</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">About this hotel</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{hotel.description}</p>
            
            {/* Amenities */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-8 w-8 mr-2 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {amenity.includes("WiFi") && <Wifi size={18} className="text-teal-600 dark:text-teal-400" />}
                    {amenity.includes("Restaurant") && <Utensils size={18} className="text-teal-600 dark:text-teal-400" />}
                    {(amenity.includes("Room") || amenity.includes("Front Desk")) && <User2 size={18} className="text-teal-600 dark:text-teal-400" />}
                    {(amenity.includes("Beach") || amenity.includes("Pool")) && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>}
                    {(amenity.includes("Bed") || amenity.includes("Suite")) && <BedDouble size={18} className="text-teal-600 dark:text-teal-400" />}
                    {amenity.includes("Breakfast") && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>}
                    {(amenity.includes("Tours") || amenity.includes("Activities")) && <Language size={18} className="text-teal-600 dark:text-teal-400" />}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Available Rooms */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Available Rooms</h2>
          <div className="space-y-4">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Booking Form */}
      {showBookingForm && selectedRoom && (
        <div id="booking-form" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Complete Your Booking</h2>
          <BookingForm room={selectedRoom} />
        </div>
      )}
    </div>
  );
}