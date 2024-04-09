const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController');


router.post('/add', bookController.addBook);

router.get('/all', bookController.getAllBooks);

router.post('/testimonials/:bookId/', bookController.addTestimonialToBook);

router.get('/:bookId', bookController.getBookById);

router.put('/update/:bookId', bookController.updateBookDetails);

router.delete('/delete/:bookId/', bookController.deleteBookById);

module.exports = router;

