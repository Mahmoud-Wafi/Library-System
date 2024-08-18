const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
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
