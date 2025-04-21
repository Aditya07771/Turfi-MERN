import express from 'express';
const router = express.Router();
import bookingController from '../controllers/booking.controller';
import auth from '../middleware/auth';

// All booking routes require authentication
router.use(auth);

router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.put('/:id/user-details', bookingController.updateUserDetails);
router.put('/:id/confirm', bookingController.confirmBooking);
router.patch('/:id/cancel', bookingController.cancelBooking);

// User bookings
router.get('/', bookingController.getUserBookings);

export default router;