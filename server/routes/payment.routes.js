const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', paymentController.processPayment);
router.get('/:id', paymentController.getPaymentDetails);

module.exports = router; 