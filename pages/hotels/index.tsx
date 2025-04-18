"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { hotels } from "@/lib/data";
import { Hotel } from "@/types";
import HotelCard from "@/components/HotelCard";
import { SearchIcon, DollarSign, Star, MapPin, X, Check } from "lucide-react";

export default function HotelList() {
  const router = useRouter();
  const { search, checkIn, checkOut, guests } = router.query;
  
  const [searchQuery, setSearchQuery] = useState<string>((search as string) || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [rating, setRating] = useState<number | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(hotels);
  const [showFilters, setShowFilters] = useState(false);
  
  const uniqueLocations = Array.from(new Set(hotels.map(hotel => hotel.location)));
  
  useEffect(() => {
    // Apply all filters
    let results = hotels;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        hotel =>
          hotel.name.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query) ||
          hotel.description.toLowerCase().includes(query)
      );
    }
    
    // Price range filter
    results = results.filter(
      hotel => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );
    
    // Rating filter
    if (rating !== null) {
      results = results.filter(hotel => hotel.rating >= rating);
    }
    
    // Location filter
    if (selectedLocations.length > 0) {
      results = results.filter(hotel => selectedLocations.includes(hotel.location));
    }
    
    setFilteredHotels(results);
  }, [searchQuery, priceRange, rating, selectedLocations]);
  
  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location)
        ? prev.filter(loc => loc !== location)
        : [...prev, location]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 500]);
    setRating(null);
    setSelectedLocations([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Discover Our Hotels</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Find the perfect accommodation for your stay in Syria
      </p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Mobile View Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
            <span className="ml-2">
              {showFilters ? (
                <X size={18} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              )}
            </span>
          </button>
        </div>
        
        {/* Filters Sidebar */}
        <div className={`${showFilters || 'lg:block hidden'} lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit sticky top-24`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              Clear all
            </button>
          </div>
          
          {/* Search */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hotels..."
                className="w-full p-2 pl-9 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all duration-200 dark:bg-gray-700 dark:text-white"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price Range
            </label>
            <div className="flex items-center mb-2">
              <DollarSign size={16} className="text-gray-500 dark:text-gray-400 mr-1" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum Rating
            </label>
            <div className="flex space-x-2">
              {[null, 3, 4, 4.5].map((value, index) => (
                <button
                  key={index}
                  onClick={() => setRating(value)}
                  className={`flex items-center justify-center px-3 py-1 rounded-md text-sm ${
                    rating === value
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-650"
                  }`}
                >
                  {value === null ? (
                    "Any"
                  ) : (
                    <>
                      {value}+ <Star size={12} className="ml-1" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Locations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Locations
            </label>
            <div className="space-y-2">
              {uniqueLocations.map((location, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => handleLocationToggle(location)}
                    className={`flex items-center w-full p-2 rounded-md ${
                      selectedLocations.includes(location)
                        ? "bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-750"
                    }`}
                  >
                    <div className={`h-4 w-4 rounded border mr-2 flex items-center justify-center ${
                      selectedLocations.includes(location)
                        ? "bg-teal-600 border-teal-600 dark:bg-teal-500 dark:border-teal-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}>
                      {selectedLocations.includes(location) && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <MapPin size={14} className="mr-1 flex-shrink-0" />
                      {location}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Hotels Grid */}
        <div className="flex-grow">
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No hotels found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We couldn't find any hotels matching your search criteria.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}