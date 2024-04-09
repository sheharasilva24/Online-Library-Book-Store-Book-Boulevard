// models/testimonialModel.js

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // assuming a 1-5 scale for the rating
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
