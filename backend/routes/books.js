const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
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
const upload = multer({ storage });

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/', upload.single('image'), async (req, res) => {
    const { name, category, author } = req.body;
    const image = req.file ? req.file.path : 'default.jpg';
    const newBook = new Book({ name, category, author, image });
    await newBook.save();
    res.status(201).json(newBook);
});

module.exports = router;
