// controllers/turf.controller.js
const Turf = require('../models/turf.model');
const Review = require('../models/review.model');
const Booking = require('../models/booking.model');

exports.getAllTurfs = async (req, res) => {
  try {
    const { 
      search, 
      minPrice, 
      maxPrice, 
      category, 
      available 
    } = req.query;
    
    let query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    
    // Category filter
    if (category) {
      // Handle both array and single value
      const categories = Array.isArray(category) ? category : [category];
      query.category = { $in: categories.map(c => new RegExp(c, 'i')) };
    }
    
    // Availability is handled differently as it requires checking bookings
    
    const turfs = await Turf.find(query);
    
    // If available filter is set, manually filter based on bookings
    let filteredTurfs = turfs;
    if (available === 'true' || available === 'false') {
      const isAvailable = available === 'true';
      
      // For accurate availability, we'd need to check against specific dates and times
      // This is a simplified approach
      const currentDate = new Date();
      const bookedTurfIds = await Booking.distinct('turfId', {
        bookingDateTime: { $gt: currentDate },
        status: { $ne: 'cancelled' }
      });
      
      filteredTurfs = isAvailable 
        ? turfs.filter(turf => !bookedTurfIds.includes(turf._id.toString()))
        : turfs.filter(turf => bookedTurfIds.includes(turf._id.toString()));
    }
    
    res.json(filteredTurfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTurfById = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    res.json(turf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTurfAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }
    
    // Find turf to get operating hours
    const turf = await Turf.findById(id);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    
    // Generate all possible time slots for the day
    const startHour = 6; // 6 AM
    const endHour = 22; // 10 PM
    const slots = [];
    
    for (let hour = startHour; hour <= endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    
    // Find bookings for this turf on the given date
    const bookingDate = new Date(date);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const bookings = await Booking.find({
      turfId: id,
      bookingDateTime: {
        $gte: bookingDate,
        $lt: nextDay
      },
      status: { $ne: 'cancelled' }
    });
    
    // Mark booked slots as unavailable
    const bookedTimes = bookings.map(booking => {
      const bookingTime = new Date(booking.bookingDateTime);
      return `${bookingTime.getHours().toString().padStart(2, '0')}:00`;
    });
    
    const availableSlots = slots.map(slot => ({
      time: slot,
      available: !bookedTimes.includes(slot)
    }));
    
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTurfReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ turfId: req.params.id })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTurfReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const turfId = req.params.id;
    const userId = req.user.id;
    
    // Check if turf exists
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }
    
    // Check if user has booked this turf before
    const userBooking = await Booking.findOne({
      turfId,
      userId,
      status: 'confirmed'
    });
    
    if (!userBooking) {
      return res.status(403).json({ 
        message: 'You can only review turfs you have booked' 
      });
    }
    
    // Create review
    const review = new Review({
      turfId,
      userId,
      rating,
      comment
    });
    
    const savedReview = await review.save();
    
    // Update turf rating
    const allReviews = await Review.find({ turfId });
    const avgRating = allReviews.reduce((acc, item) => acc + item.rating, 0) / allReviews.length;
    
    turf.rating = avgRating.toFixed(1);
    turf.totalReviews = allReviews.length;
    await turf.save();
    
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


