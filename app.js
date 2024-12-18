// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');
const courseRoutes = require('./routes/courseRoutes');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes'); // Mengimpor route upload



// Sinkronisasi model ke database
sequelize.sync({ alter: true })
    .then(() => console.log('Database synchronized successfully.'))
    .catch(err => console.error('Database synchronization failed:', err));


const app = express();
const PORT = 5000;


// Middleware menangani permintaan jason dan url-encoded
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Menyajikan file statis dari folder uploads (opsional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Routes
app.use('/auth', authRoutes);
app.use('/course', courseRoutes);

// Gunakan routes untuk unggah file
app.use('/course', uploadRoutes);


app.get('/test', (req, res) => {
    res.send('Server is running');
});



// Start Server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});









/*
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Start Server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

// config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('video_belajar', 'root', 'Dudunsuparmaidi1974', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;

// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = User;

// services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
// const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const JWT_SECRET = 'abi_jwtsecret';

const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Buat JWT token untuk verifikasi email
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    // const token = uuidv4(); // random token
    
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

// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'abi_jwtsecret';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });

        req.userId = decoded.userId;
        next();
    });
};

module.exports = { verifyToken };

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
    try {
        const message = await verifyEmail(token);
        res.status(200).json({ message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
*/