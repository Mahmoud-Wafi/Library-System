const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Search books by name, category, or author
router.get('/', async(req, res) => {
    const { search = '', category = '', author = '' } = req.query;

    try {
        const query = {
            name: new RegExp(search, 'i'), // Case-insensitive search
            ...(category && { category_id: category }),
            ...(author && { author_id: author })
        };

        const books = await Book.find(query).populate('category_id').populate('author_id');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all books
router.get('/', async(req, res) => {
    try {
        const books = await Book.find().populate('category_id').populate('author_id');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single book by ID
router.get('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('category_id').populate('author_id');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new book (admin only)
router.post('/', authenticateToken, authorizeAdmin, async(req, res) => {
    const { name, photo, category_id, author_id } = req.body;
    try {
        const newBook = new Book({ name, photo, category_id, author_id });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a book (admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;