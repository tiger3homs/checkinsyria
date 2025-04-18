export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  amenities: string[];
  rooms: string[];
}

export interface Room {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  available: boolean;
  images: string[];
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomId: string;
  specialRequests?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export type Language = 'en' | 'ar';