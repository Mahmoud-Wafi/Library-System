const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Book = require('../models/Book');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// srearch function 
router.get('/', async(req, res) => {
    const { search = '' } = req.query;

    try {
        const categories = await Category.find({
            name: new RegExp(search, 'i') // Case-insensitive search
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all categories
router.get('/', async(req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new category (admin only)
router.post('/',  async(req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a category (admin only)
router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get category details including books and authors
router.get('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        // Find the category
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find books in the category and populate author details
        const books = await Book.find({ category_id: id }).populate('author_id', 'name');

        // Format the response
        const categoryDetails = {
            ...category.toObject(),
            books: books.map(book => ({
                name: book.name,
                author: book.author_id ? book.author_id.name : 'Unknown',
                photo: book.photo
            }))
        };

        res.json(categoryDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;