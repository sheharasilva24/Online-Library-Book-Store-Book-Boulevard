// models/CheckoutDetail.js
const mongoose = require('mongoose');

const checkoutDetailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true, // Assuming each transaction ID is unique
    },
    userId: {
        type: String,
        required: true,
        unique: true,// Assuming you have a User model and you're storing the reference
    },
    subscriptionStatus: {
        type: String,
        default: 'active', // or 'expired', choose based on your application logic
    },
    subscriptionEndDate: {
        type: Date,
        default: null,
    },
}, { timestamps: true });





module.exports = mongoose.model('CheckoutDetail', checkoutDetailSchema);
