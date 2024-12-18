// uploadController.js
const upload = require('../services/uploadService'); // Import service upload

// Endpoint untuk mengunggah file
const uploadFile = (req, res) => {
  // Periksa jika file tidak ada di dalam request
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Jika file berhasil diunggah
  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file, // Mengembalikan informasi tentang file yang diunggah
  });
};

module.exports = { uploadFile };
