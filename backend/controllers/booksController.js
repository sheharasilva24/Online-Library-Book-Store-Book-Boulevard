const Book = require('../models/Books');
const {findByIdAndUpdate} = require("../models/Books");


exports.addBook = async (req, res) => {
    try {
        const { bookName, bookLink, bookImg, author, category, aboutBook, aboutAuthor  } = req.body;

        // Add more validation as needed
        if (!bookName || !bookLink || !bookImg || !author || !category || !aboutBook || !aboutAuthor) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newBook = new Book({ bookName, bookLink, bookImg, author, category, aboutBook, aboutAuthor  });
        await newBook.save();

        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add the book', error: error.message });
    }
};


exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get books', error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const { bookId } = req.params;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid book ID format' });
        }
        res.status(500).json({ message: 'Failed to get book', error: error.message });
    }
};


exports.updateBookDetails = async (req, res) => {
    try {
        const { bookId } = req.params;
        const updateData = req.body;

        // Update the book and return the updated document
        const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error: error.message });
    }
};

exports.deleteBookById = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Delete the book from the database
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
};


exports.addTestimonialToBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { text, user } = req.body;

        if (!text || !user) {
            return res.status(400).json({ message: 'Testimonial text and user are required' });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { $push: { testimonials: { text, user, createdAt: Date.now() } } },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Testimonial added successfully', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Error adding testimonial', error: error.message });
    }
};

