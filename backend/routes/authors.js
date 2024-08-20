const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

router.get('/', async(req, res) => {
    const { search = '' } = req.query;

    try {
        const authors = await Author.find({
            name: new RegExp(search, 'i') // Case-insensitive search
        });
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all authors
router.get('/', async(req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single author by ID
router.get('/:id', async(req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new author (admin only)
router.post('/',  async(req, res) => {
    const { name, photo, dateOfBirth } = req.body;
    try {
        const newAuthor = new Author({ name, photo, dateOfBirth });
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an author (admin only)
router.delete('/:id',  async(req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.json({ message: 'Author deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;