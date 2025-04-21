const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  turfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turf',
    required: true
  },
  turfName: {
    type: String,
    required: true
  },
  turfImage: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  bookingDateTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in hours
    required: true,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  turfContact: {
    type: String
  },
  bookedAt: {
    type: Date,
    default: Date.now
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String
  }
});

// Virtual for checking if booking is upcoming
bookingSchema.virtual('isUpcoming').get(function() {
  return new Date(this.bookingDateTime) > new Date();
});

// Virtual for checking if cancellation is allowed
bookingSchema.virtual('isCancellable').get(function() {
  if (this.status === 'cancelled') return false;
  
  const bookingTime = new Date(this.bookingDateTime);
  const now = new Date();
  const diffHours = (bookingTime - now) / (1000 * 60 * 60);
  
  return diffHours >= 24; // Can cancel if more than 24 hours before booking
});

// Index for faster queries by userId and status
bookingSchema.index({ userId: 1, status: 1 });
bookingSchema.index({ bookingDateTime: 1 }); // For date-based queries

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;