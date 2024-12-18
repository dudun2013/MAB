// uploadRoutes.js

const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController'); // Import controller
const upload = require('../services/uploadService'); // Import konfigurasi multer

// Endpoint untuk mengunggah file
router.post('/upload', upload.single('image'), uploadFile); // 'image' adalah nama field dari form-data

module.exports = router;
