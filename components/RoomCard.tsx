"use client";

import { useState } from "react";
import Image from "next/image";
import { Room } from "@/types";
import { Check, X, Users, ChevronRight } from "lucide-react";

interface RoomCardProps {
  room: Room;
  onBookNow: (roomId: string) => void;
}

export default function RoomCard({ room, onBookNow }: RoomCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${isExpanded ? 'mb-8' : 'mb-4'}`}>
      <div 
        className="flex flex-col md:flex-row cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="relative md:w-1/4 h-48 md:h-auto">
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          {!room.available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Not Available</span>
            </div>
          )}
        </div>
        
        <div className="p-4 md:p-6 flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {room.name}
            </h3>
            
            <div className="flex items-center mt-2 md:mt-0">
              <span className="flex items-center text-gray-600 dark:text-gray-400 mr-4">
                <Users size={18} className="mr-1" />
                <span>Up to {room.capacity} guests</span>
              </span>
              
              <span className={`flex items-center ${room.available ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {room.available ? (
                  <>
                    <Check size={18} className="mr-1" />
                    <span>Available</span>
                  </>
                ) : (
                  <>
                    <X size={18} className="mr-1" />
                    <span>Unavailable</span>
                  </>
                )}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm my-2 line-clamp-2">
            {room.description}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${room.price}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">/ night</span>
            </div>
            
            <button 
              className={`flex items-center text-sm font-medium ${isExpanded ? 'rotate-90' : ''} transition-transform`}
              aria-label="Toggle details"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0 bg-gray-50 dark:bg-gray-750">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {room.description}
            </p>
            
            <div className="flex justify-end">
              <button
                onClick={() => room.available && onBookNow(room.id)}
                disabled={!room.available}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  room.available
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {room.available ? 'Book Now' : 'Not Available'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}