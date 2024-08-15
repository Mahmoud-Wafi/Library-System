const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// Register a new user
router.post('/register', [
    body('name').isString().trim().notEmpty().withMessage('Name is required'),
    body('username').isString().trim().notEmpty().withMessage('Username is required'),
    body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('isAdmin').optional().isBoolean().withMessage('isAdmin must be a boolean')
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, password, email, isAdmin = false } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, username, password: hashedPassword, email, isAdmin });
        await newUser.save();

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// Login user
router.post('/login', [
    body('username').isString().trim().notEmpty().withMessage('Username is required'),
    body('password').isString().trim().notEmpty().withMessage('Password is required')
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid username or password' });

        const accessToken = jwt.sign({ username: user.username, isAdmin: user.isAdmin },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }
        );

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;