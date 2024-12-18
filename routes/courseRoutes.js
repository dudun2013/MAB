// routes/courseRoutes.js
const express = require('express');
const { getCourses } = require('../controllers/courseController');

const router = express.Router();

// Route untuk mendapatkan daftar courses
router.get('/', getCourses);

module.exports = router;






