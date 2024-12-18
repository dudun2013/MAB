// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

const JWT_SECRET = 'abi_jwtsecret';

const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    const newUser = await User.create({ username, email, password: hashedPassword, token });

    // Send verification email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'du2n2013@gmail.com',
        to: email,
        subject: 'Verify your email',
        text: `Please verify your email by clicking the following link: http://localhost:3000/auth/verify-email?token=${token}`,
    };

    await transporter.sendMail(mailOptions);
    return newUser;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Email or password is incorrect');

    if (user.token) throw new Error('Please verify your email first'); // Cek email sudah diverifikasi atau belum

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Email or password is incorrect');

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
};

const verifyEmail = async (token) => {
    try {
        // Verifikasi token JWT
        const decoded = jwt.verify(token, JWT_SECRET);

        // Temukan user berdasarkan email
        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) throw new Error('User not found');

        // Hapus token (tandai email sudah diverifikasi)
        user.token = null;
        await user.save();

        return 'Email verified successfully';
    } catch (error) {
        throw new Error('Invalid verification token');
    }
};

module.exports = { registerUser, loginUser, verifyEmail };
