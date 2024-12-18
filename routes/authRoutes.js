// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, verifyEmail } = require('../services/authService');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// Verify Email endpoint
router.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    console.log("Token yang diterima:", token); // Debugging

    try {
        const message = await verifyEmail(token);
        res.status(200).json({ message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
