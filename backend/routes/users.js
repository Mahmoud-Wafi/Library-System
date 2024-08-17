const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Public: Signup route
router.post('/signup', async (req, res) => {
    const { username, password, email, name } = req.body;

    // Validate incoming data
    if (!name || !username || !password || !email) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            email
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin-only: Get all users
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin-only: Get a single user by ID
router.get('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin-only: Create a new user (admin only)
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
    const { username, password, email, isAdmin } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            isAdmin
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Admin-only: Delete a user by ID
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
