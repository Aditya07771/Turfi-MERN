import React, { useState } from 'react';
import { Star, MapPin, Navigation } from 'lucide-react';

// (Previous components remain the same, I'll just update the TurfMap component)
const TurfMap = ({ turfs, selectedLocation }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Turf Locations</h2>
        <button 
          className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-full hover:bg-blue-600 transition"
          // This would trigger geolocation in a real app
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  // Handle location logic
                  console.log('Current Location:', position.coords);
                },
                (error) => {
                  console.error('Location error:', error);
                }
              );
            }
          }}
        >
          <Navigation className="mr-2" size={20} />
          Near Me
        </button>
      </div>

      {/* Simulated Google Maps-like container */}
      <div 
        className="w-full h-96 bg-gray-200 relative"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        {/* Map Pin Markers */}
        {turfs.map((turf, index) => (
          <div 
            key={turf.id}
            className="absolute bg-red-500 text-white p-2 rounded-full shadow-lg"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`
            }}
            title={turf.name}
          >
            <MapPin fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Location List */}
      <div className="p-4">
        <h3 className="font-semibold mb-3 text-lg">Turf Venues</h3>
        <ul className="space-y-2">
          {turfs.map(turf => (
            <li 
              key={turf.id} 
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center">
                <MapPin className="mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">{turf.name}</p>
                  <p className="text-gray-500 text-sm">{turf.location}</p>
                </div>
              </div>
              <span className="text-green-600 font-bold">₹{turf.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// (Rest of the code remains the same as in the previous submission)
export default TurfMap;