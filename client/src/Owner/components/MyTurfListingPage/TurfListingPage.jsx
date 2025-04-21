import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';

const TurfCard = ({ turf }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full border rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="flex flex-col md:flex-row cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Left side - Turf Image */}
        <div className="md:w-1/3 h-48">
          <img 
            src={turf.imageUrl || "/api/placeholder/400/300"}
            alt={turf.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right side - Basic Turf Details */}
        <div className="md:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-gray-800">{turf.name}</h2>
              <span className="text-green-600 font-semibold">₹{turf.pricePerHour}/hr</span>
            </div>
            
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin size={16} className="mr-1" />
              <p className="text-sm">{turf.location}</p>
            </div>
            
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Available Sports:</p>
              <div className="flex flex-wrap gap-2">
                {turf.availableSports.map((sport, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {turf.bookingsToday} bookings today
            </span>
            <button 
              className="flex items-center text-blue-600 hover:text-blue-800"
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  <span className="mr-1">Less Details</span>
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  <span className="mr-1">More Details</span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Expandable Details Section */}
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Amenities</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {turf.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Opening Hours</h3>
              <div className="flex items-start text-sm text-gray-600">
                <Clock size={16} className="mr-2 mt-1" />
                <span>{turf.openingHours}</span>
              </div>
              
              <h3 className="font-medium text-gray-800 mt-4 mb-2">Contact Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  <span>{turf.contactPhone}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span>{turf.contactEmail}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t flex justify-between">
            <span className="text-sm text-gray-600">
              {turf.reviews} reviews • {turf.rating}/5 rating
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Navigate to booking details page
                // window.location.href = `/owner/turf-bookings/${turf.id}`;
                window.location.href = `/owner/turf-bookings/1`;
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              View Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TurfListingPage = () => {
  // Sample data - replace with your actual data
  const turfs = [
    {
      id: 1,
      name: "Green Field Turf",
      imageUrl: "https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1719570263115.webp&w=640&q=75",
      location: "Koramangala, Bangalore",
      pricePerHour: 1200,
      availableSports: ["Football", "Cricket", "Basketball"],
      bookingsToday: 8,
      amenities: ["Changing Rooms", "Washrooms", "Parking", "Flood Lights", "Water Dispenser"],
      openingHours: "6:00 AM - 11:00 PM (Mon-Sun)",
      contactPhone: "+91 9876543210",
      contactEmail: "greenfield@example.com",
      reviews: 128,
      rating: 4.7
    },
    {
      id: 2,
      name: "Sports Arena",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFLCrxVr7YkF7UWywEcnMyCzx-2Zr2jfDz4LAWn9jshRDGbYRU29D8mLeLDaZiMEgjKaw&usqp=CAU",
      location: "HSR Layout, Bangalore",
      pricePerHour: 1500,
      availableSports: ["Football", "Tennis"],
      bookingsToday: 5,
      amenities: ["Changing Rooms", "Washrooms", "Parking", "Flood Lights", "Cafeteria"],
      openingHours: "5:00 AM - 10:00 PM (Mon-Sun)",
      contactPhone: "+91 9876543211",
      contactEmail: "sportsarena@example.com",
      reviews: 86,
      rating: 4.5
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-25 bg-white">
      <h1 className="text-2xl font-bold mb-6">Your Turf Listings</h1>
      <div className="space-y-4">
        {turfs.map(turf => (
          <TurfCard key={turf.id} turf={turf} />
        ))}
      </div>
    </div>
  );
};

export default TurfListingPage;