"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Room } from "@/types";
import { CalendarIcon, Users, CheckCircle } from "lucide-react";

interface BookingFormProps {
  room: Room;
}

export default function BookingForm({ room }: BookingFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      
      if (checkOut <= checkIn) {
        newErrors.checkOut = "Check-out date must be after check-in date";
      }
    }
    
    if (formData.guests <= 0) {
      newErrors.guests = "Number of guests must be at least 1";
    } else if (formData.guests > room.capacity) {
      newErrors.guests = `Maximum capacity is ${room.capacity} guests`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // In a real app, you would send the data to your backend here
        console.log("Booking submitted:", formData);
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your booking. We've sent a confirmation email to {formData.email}.
          </p>
          <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 mb-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Room</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{room.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Guests</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{formData.guests}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{new Date(formData.checkIn).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{new Date(formData.checkOut).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push("/hotels")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Return to Hotels
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Book Your Stay</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.firstName ? "border-red-500 dark:border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.lastName ? "border-red-500 dark:border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.phone ? "border-red-500 dark:border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Check-in Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full p-2 pl-10 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.checkIn ? "border-red-500 dark:border-red-500" : "border-gray-300"
                }`}
              />
              <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            {errors.checkIn && <p className="mt-1 text-sm text-red-500">{errors.checkIn}</p>}
          </div>
          
          <div>
            <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Check-out Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                className={`w-full p-2 pl-10 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.checkOut ? "border-red-500 dark:border-red-500" : "border-gray-300"
                }`}
              />
              <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            {errors.checkOut && <p className="mt-1 text-sm text-red-500">{errors.checkOut}</p>}
          </div>
          
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number of Guests
            </label>
            <div className="relative">
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className={`w-full p-2 pl-10 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none ${
                  errors.guests ? "border-red-500 dark:border-red-500" : "border-gray-300"
                }`}
              >
                {[...Array(room.capacity)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
              <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            {errors.guests && <p className="mt-1 text-sm text-red-500">{errors.guests}</p>}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Special Requests (optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-md mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Booking Summary</h3>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600 dark:text-gray-400">Room:</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">{room.name}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600 dark:text-gray-400">Price per night:</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">${room.price}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
            <span className="text-gray-900 dark:text-gray-100 font-semibold">Total:</span>
            <span className="text-gray-900 dark:text-gray-100 font-semibold">${room.price}</span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Processing..." : "Complete Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}