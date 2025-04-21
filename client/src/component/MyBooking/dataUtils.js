// Format date for display
export const formatDate = (dateString, includeTime = false) => {
    const options = { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  
  // Check if booking can be cancelled
  export const canCancelBooking = (bookingDateTime, status) => {
    // Can only cancel confirmed or pending bookings
    if (status !== 'confirmed' && status !== 'pending') {
      return false;
    }
    
    const bookingDate = new Date(bookingDateTime);
    const now = new Date();
    
    // Calculate time difference in hours
    const diffHours = (bookingDate - now) / (1000 * 60 * 60);
    
    // Allow cancellation if booking is at least 24 hours in the future
    return diffHours >= 24;
  };