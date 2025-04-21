import React from 'react';
import BookingCard from './BookingCard';

const BookingsList = ({ bookings, onCancelBooking }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map(booking => (
        <BookingCard 
          key={booking._id} 
          booking={booking} 
          onCancelBooking={onCancelBooking} 
        />
      ))}
    </div>
  );
};

export default BookingsList;