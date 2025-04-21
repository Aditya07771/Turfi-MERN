const turfData = [
  {
    id: 1,
    name: "Green Field Arena",
    location: "City Center",
    category: "Football",
    price: 1200,
    rating: 4.5,
    available: true,
    facilities: ["Floodlights", "Changing Rooms", "Parking"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 2,
    name: "Urban Sports Complex",
    location: "Downtown",
    category: "Cricket",
    price: 1500,
    rating: 4.8,
    available: true,
    facilities: ["Professional Pitch", "Seating", "Coaching"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 3,
    name: "Riverside Turf",
    location: "Riverside Area",
    category: "Multiple",
    price: 1000,
    rating: 4.2,
    available: false,
    facilities: ["Open Ground", "Basic Amenities"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 4,
    name: "Sunset Sports Ground",
    location: "Suburban Area",
    category: "Football",
    price: 800,
    rating: 4.0,
    available: true,
    facilities: ["Community Ground", "Basic Setup"],
    image: "/api/placeholder/400/250",
  },
];

// Price Range Filters
export const singleFilters = [
  {
    id: "price",
    name: "Price Range",
    options: [
      { value: "0-500", label: "₹0 - ₹500" },
      { value: "500-1000", label: "₹500 - ₹1000" },
      { value: "1000-2000", label: "₹1000 - ₹2000" },
      { value: "2000+", label: "₹2000+" }
    ]
  }
];

// Other filter configurations
const filters = [
  {
    id: "category",
    name: "Sports Category",
    options: [
      { value: "football", label: "Football" },
      { value: "cricket", label: "Cricket" },
      { value: "multiple", label: "Multiple Sports" },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    options: [
      { value: "available", label: "Available Now" },
      { value: "booked", label: "Booked" },
    ],
  },
];