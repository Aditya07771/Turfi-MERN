// controllers/booking.controller.js
const Booking = require('../models/booking.model');
const Turf = require('../models/turf.model');
const Payment = require('../models/payment.model');

exports.createBooking = async (req, res) => {
  try {
    const { turfId, date, timeSlot } = req.body;
    const userId = req.user.id;
    
    // Validate turf exists
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    
    // Create booking date time object
    const [hours] = timeSlot.split(':');
    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(parseInt(hours), 0, 0, 0);
    
    // Check if slot is already booked
    const existingBooking = await Booking.findOne({
      turfId,
      bookingDateTime,
      status: { $ne: 'cancelled' }
    });
    
    if (existingBooking) {
      return res.status(400).json({ message: 'Time slot is already booked' });
    }
    
    // Create new booking
    const newBooking = new Booking({
      userId,
      turfId,
      bookingDateTime,
      status: 'pending'
    });
    
    const savedBooking = await newBooking.save();
    
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
