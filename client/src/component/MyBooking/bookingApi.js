import axios from 'axios';

const API_URL = '/api';

// Fetch user bookings
// export const fetchUserBookings = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/bookings`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     throw error;
//   }
// };

// // Cancel a booking
// export const cancelBooking = async (bookingId) => {
//   try {
//     const response = await axios.patch(`${API_URL}/bookings/${bookingId}/cancel`);
//     return response.data;
//   } catch (error) {
//     console.error('Error cancelling booking:', error);
//     throw error;
//   }
// };


// bookingApi.js
export const fetchUserBookings = async () => {
  try {
    // Return mock data instead of API call
    return getMockBookings();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Remove or comment out the real cancelBooking implementation
export const cancelBooking = async (bookingId) => {
  // Mock cancellation
  return { success: true };
};


// For development/testing - mock data
export const getMockBookings = () => {
  return [
    {
      _id: '1',
      turfName: 'Green Field Turf',
      location: 'Andheri West',
      address: '123 Sports Complex, Andheri West, Mumbai 400053',
      bookingDateTime: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      status: 'confirmed',
      price: 1500,
      paymentStatus: 'Paid',
      turfContact: '+91 9876543210',
      turfImage: '/api/placeholder/400/250'
    },
    {
      _id: '2',
      turfName: 'Urban Kicks Arena',
      location: 'Bandra East',
      address: '45 Sports Hub, Bandra East, Mumbai 400051',
      bookingDateTime: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
      status: 'pending',
      price: 1800,
      paymentStatus: 'Awaiting Payment',
      turfContact: '+91 9876543211',
      turfImage: '/api/placeholder/400/250'
    },
    {
      _id: '3',
      turfName: 'Turf City',
      location: 'Malad West',
      address: '78 Play Zone, Malad West, Mumbai 400064',
      bookingDateTime: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
      status: 'confirmed',
      price: 1200,
      paymentStatus: 'Paid',
      turfContact: '+91 9876543212',
      turfImage: '/api/placeholder/400/250'
    },
    {
      _id: '4',
      turfName: 'Stadium X',
      location: 'Powai',
      address: '90 Sports Avenue, Powai, Mumbai 400076',
      bookingDateTime: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      status: 'cancelled',
      price: 2000,
      paymentStatus: 'Refunded',
      turfContact: '+91 9876543213',
      turfImage: '/api/placeholder/400/250'
    }
  ];
};