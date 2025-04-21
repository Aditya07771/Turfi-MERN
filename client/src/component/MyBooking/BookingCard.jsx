import React, { useState } from 'react';
import { formatDate } from './dataUtils';
import BookingDetails from './BookingDetails';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const BookingCard = ({ booking, onCancelBooking }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusClass = getStatusColor(booking.status);

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      {/* Basic booking info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{booking.turfName}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
            {booking.status}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{booking.location}</p>
        <p className="text-gray-800 mb-3">
          {formatDate(booking.bookingDateTime)}
        </p>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <BookingDetails 
          booking={booking} 
          onCancelBooking={onCancelBooking} 
        />
      )}
    </div>
  );
};

export default BookingCard;