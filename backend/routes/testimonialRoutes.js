const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/createTestimonial',authenticateToken, testimonialController.createTestimonial);
router.get('/getTestimonials', testimonialController.getTestimonials);

module.exports = router;
