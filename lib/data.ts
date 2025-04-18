import { Hotel, Room } from "@/types";

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Beit Al-Wali Heritage Hotel",
    description: "A beautifully restored 18th-century mansion featuring traditional Syrian architecture with a central courtyard and fountain. Each room is uniquely decorated with antique furniture and handcrafted Syrian textiles.",
    location: "Old Damascus, Syria",
    price: 120,
    rating: 4.8,
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
    ],
    amenities: ["Free WiFi", "Air Conditioning", "Restaurant", "Room Service", "24-Hour Front Desk"],
    rooms: ["1", "2", "3"]
  },
  {
    id: "2",
    name: "Aleppo Grand Hotel",
    description: "Located in the heart of Aleppo's rebuilt district, this luxury hotel combines modern comfort with elements of traditional Syrian design. Enjoy panoramic views of the ancient citadel from our rooftop restaurant.",
    location: "Central Aleppo, Syria",
    price: 150,
    rating: 4.6,
    images: [
      "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg",
      "https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg",
      "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg"
    ],
    amenities: ["Swimming Pool", "Spa", "Free WiFi", "Premium Breakfast", "Fitness Center"],
    rooms: ["4", "5", "6"]
  },
  {
    id: "3",
    name: "Palmyra Desert Resort",
    description: "Experience the magic of the Syrian desert at our eco-friendly resort near the historic site of Palmyra. Our traditional desert-style accommodations offer comfort with minimal environmental impact.",
    location: "Palmyra Region, Syria",
    price: 180,
    rating: 4.9,
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
      "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg"
    ],
    amenities: ["Desert Tours", "Traditional Cuisine", "Cultural Activities", "Star Gazing", "Free Parking"],
    rooms: ["7", "8", "9"]
  },
  {
    id: "4",
    name: "Latakia Beachfront Hotel",
    description: "Our Mediterranean-inspired hotel offers direct access to the beautiful beaches of Latakia. Enjoy sea views, fresh seafood, and all the amenities you need for a perfect coastal vacation.",
    location: "Latakia Coast, Syria",
    price: 135,
    rating: 4.5,
    images: [
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
      "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg",
      "https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg"
    ],
    amenities: ["Private Beach", "Water Sports", "Seaside Restaurant", "Free WiFi", "Airport Shuttle"],
    rooms: ["10", "11", "12"]
  }
];

export const rooms: { [key: string]: Room } = {
  "1": {
    id: "1",
    hotelId: "1",
    name: "Heritage Suite",
    description: "Spacious suite with traditional Syrian decor, featuring a king-sized bed and sitting area.",
    price: 120,
    capacity: 2,
    available: true,
    images: ["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"]
  },
  "2": {
    id: "2",
    hotelId: "1",
    name: "Courtyard Room",
    description: "Charming room overlooking the central courtyard with handcrafted furniture and a queen bed.",
    price: 90,
    capacity: 2,
    available: true,
    images: ["https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg"]
  },
  "3": {
    id: "3",
    hotelId: "1",
    name: "Family Room",
    description: "Spacious room with one king bed and two single beds, perfect for families.",
    price: 150,
    capacity: 4,
    available: false,
    images: ["https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg"]
  },
  "4": {
    id: "4",
    hotelId: "2",
    name: "Citadel View Suite",
    description: "Luxury suite with panoramic views of Aleppo Citadel, featuring a king-sized bed and premium amenities.",
    price: 180,
    capacity: 2,
    available: true,
    images: ["https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg"]
  },
  "5": {
    id: "5",
    hotelId: "2",
    name: "Deluxe Double Room",
    description: "Contemporary room with city views, a queen bed, and modern furnishings.",
    price: 120,
    capacity: 2,
    available: true,
    images: ["https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg"]
  },
  "6": {
    id: "6",
    hotelId: "2",
    name: "Executive Suite",
    description: "Spacious suite with separate living area, king-sized bed, and executive work desk.",
    price: 220,
    capacity: 2,
    available: false,
    images: ["https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"]
  },
  "7": {
    id: "7",
    hotelId: "3",
    name: "Desert View Tent",
    description: "Luxurious tent accommodation with modern amenities and stunning desert views.",
    price: 200,
    capacity: 2,
    available: true,
    images: ["https://images.pexels.com/photos/3735733/pexels-photo-3735733.jpeg"]
  },
  "8": {
    id: "8",
    hotelId: "3",
    name: "Eco Bungalow",
    description: "Sustainable bungalow built with local materials, featuring a queen bed and private terrace.",
    price: 150,
    capacity: 2,
    available: true,
    images: ["https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg"]
  },
  "9": {
    id: "9",
    hotelId: "3",
    name: "Family Desert Lodge",
    description: "Spacious lodge with two bedrooms, accommodating up to five guests with desert views.",
    price: 280,
    capacity: 5,
    available: false,
    images: ["https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg"]
  },
  "10": {
    id: "10",
    hotelId: "4",
    name: "Sea View Room",
    description: "Bright room with a balcony overlooking the Mediterranean Sea and a queen-sized bed.",
    price: 140,
    capacity: 2,
    available: true,
    images: ["https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg"]
  },
  "11": {
    id: "11",
    hotelId: "4",
    name: "Beachfront Suite",
    description: "Luxury suite with direct beach access, a king-sized bed, and premium amenities.",
    price: 220,
    capacity: 2,
    available: true,
    images: ["https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg"]
  },
  "12": {
    id: "12",
    hotelId: "4",
    name: "Family Beach House",
    description: "Detached beach house with two bedrooms, a full kitchen, and a private patio.",
    price: 320,
    capacity: 6,
    available: false,
    images: ["https://images.pexels.com/photos/206648/pexels-photo-206648.jpeg"]
  }
};

export const getHotelById = (id: string): Hotel | undefined => {
  return hotels.find(hotel => hotel.id === id);
};

export const getRoomsByHotelId = (hotelId: string): Room[] => {
  return Object.values(rooms).filter(room => room.hotelId === hotelId);
};

export const getRoomById = (id: string): Room | undefined => {
  return rooms[id];
};