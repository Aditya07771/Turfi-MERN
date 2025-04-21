import React, { useState, useEffect } from 'react';
import BookingsList from './BookingsList';
import BookingsFilter from './BookingsFilter';
import { fetchUserBookings } from './bookingApi';
import LoadingSpinner from './LoadingSpinner';


const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserBookings();
        setBookings(data);
        filterBookings(data, activeFilter);
      } catch (err) {
        setError('Failed to load bookings. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookings();
  }, [activeFilter]);

  const filterBookings = (bookingsData, filterType) => {
    const now = new Date();
    
    let filtered;
    switch (filterType) {
      case 'upcoming':
        filtered = bookingsData.filter(booking => 
          new Date(booking.bookingDateTime) > now && booking.status !== 'cancelled'
        );
        break;
      case 'completed':
        filtered = bookingsData.filter(booking => 
          new Date(booking.bookingDateTime) < now && booking.status === 'confirmed'
        );
        break;
      case 'cancelled':
        filtered = bookingsData.filter(booking => 
          booking.status === 'cancelled'
        );
        break;
      default:
        filtered = bookingsData;
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.bookingDateTime) - new Date(a.bookingDateTime));
    setFilteredBookings(filtered);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    filterBookings(bookings, filter);
  };

  // const handleCancelBooking = async (bookingId) => {
  //   try {
  //     // API call to cancel booking would go here
  //     // For now we'll just update the local state
  //     const updatedBookings = bookings.map(booking => 
  //       booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
  //     );
  //     setBookings(updatedBookings);
  //     filterBookings(updatedBookings, activeFilter);
  //   } catch (err) {
  //     setError('Failed to cancel booking. Please try again.');
  //     console.error(err);
  //   }
  // };

  // BookingsPage.jsx
const handleCancelBooking = async (bookingId) => {
  const updatedBookings = bookings.map(booking => 
    booking._id === bookingId ? { 
      ...booking, 
      status: 'cancelled',
      paymentStatus: booking.paymentStatus === 'Paid' ? 'Refunded' : 'Cancelled'
    } : booking
  );
  setBookings(updatedBookings);
  filterBookings(updatedBookings, activeFilter);
};

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 mt-25 bg-white">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <BookingsFilter 
        activeFilter={activeFilter} 
        onFilterChange={handleFilterChange} 
      />
      
      {filteredBookings.length > 0 ? (
        <BookingsList 
          bookings={filteredBookings} 
          onCancelBooking={handleCancelBooking} 
        />
      ) : (
        <div className="text-center py-10 text-gray-500">
          No {activeFilter} bookings found.
        </div>
      )}
    </div>
  );
};

export default BookingsPage;