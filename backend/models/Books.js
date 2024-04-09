const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'A testimonial must have text'],
    },
    user: {
        type: String,
        required: [true, 'A testimonial must come from a user'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, 'A book must have a name'],
        trim: true,
    },
    bookLink: {
        type: String,
        required: [true, 'A book Loader'],
    },
    bookImg: {
        type: String,
        required: [true, 'A book Image'],
    },
    author: {
        type: String,
        required: [true, 'A book must have an author'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'A book must belong to a category'],
        trim: true,
    },
    aboutBook: {
        type: String,
        required: [true, 'A book must have a description'],
    },
    aboutAuthor: {
        type: String,
        required: [true, 'There must be a description about the author'],
    },
    testimonials: [testimonialSchema], // Embedding testimonials in the book document
});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;