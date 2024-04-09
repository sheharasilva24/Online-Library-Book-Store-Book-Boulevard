const express = require('express');
const { saveCheckoutDetails, subscriptionStatus} = require('../controllers/checkoutController');
const router = express.Router();

// Route to save checkout details
router.post('/checkout-details', saveCheckoutDetails);

router.get('/subscriptionStatus/:userId/', subscriptionStatus);

module.exports = router;
