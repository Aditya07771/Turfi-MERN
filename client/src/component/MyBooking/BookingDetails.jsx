import React from 'react';
import { formatDate, canCancelBooking } from './dataUtils';

const BookingDetails = ({ booking, onCancelBooking }) => {
  const isCancellable = canCancelBooking(booking.bookingDateTime, booking.status);
  
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      onCancelBooking(booking._id);
    }
  };
  
  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50">
      <div className="mb-4">
        {booking.turfImage && (
          <img 
            src={booking.turfImage} 
            alt={booking.turfName} 
            className="w-full h-48 object-cover rounded-md mb-3" 
          />
        )}
        
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Full Address</h4>
            <p className="text-gray-800">{booking.address}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Booking Date & Time</h4>
            <p className="text-gray-800">{formatDate(booking.bookingDateTime, true)}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Payment</h4>
            <p className="text-gray-800">
              ₹{booking.price.toFixed(2)} • {booking.paymentStatus}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Contact</h4>
            <p className="text-gray-800">{booking.turfContact}</p>
          </div>
        </div>
      </div>
      
      {isCancellable && (
        <button
          onClick={handleCancel}
          className="w-full py-2 px-4 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default BookingDetails;