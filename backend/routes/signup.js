// routes/signup.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, username, password, email } = req.body;

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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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

module.exports = router;
