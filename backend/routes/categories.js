const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new category (admin only)
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
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
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
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

module.exports = router;
