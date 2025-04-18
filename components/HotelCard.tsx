import Link from "next/link";
import Image from "next/image";
import { Hotel } from "@/types";
import { MapPin, Star, DollarSign } from "lucide-react";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <Link href={`/hotels/${hotel.id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 rounded-full px-2 py-1 text-xs font-semibold flex items-center shadow-sm">
            <Star size={14} className="text-amber-500 mr-1" />
            <span>{hotel.rating}</span>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {hotel.name}
          </h3>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
            <MapPin size={14} className="mr-1 flex-shrink-0" />
            <span className="text-sm truncate">{hotel.location}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
            {hotel.description.substring(0, 100)}...
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              <span className="font-bold text-lg">${hotel.price}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">/ night</span>
            </div>
            
            <div className="text-sm font-medium text-teal-600 dark:text-teal-400 group-hover:underline">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}