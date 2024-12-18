// services/uploadService.js
const multer = require('multer');
const path = require('path');

// Tentukan penyimpanan file menggunakan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tentukan folder upload
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // Tentukan nama file yang akan disimpan
    const fileExtension = path.extname(file.originalname);
    const filename = Date.now() + fileExtension; // Gunakan timestamp untuk menghindari nama file duplikat
    cb(null, filename);
  },
});

// Validasi file (misalnya hanya menerima gambar dengan ekstensi tertentu)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File must be an image'), false); // Jika file bukan gambar
  }
};

// Buat konfigurasi Multer dengan penyimpanan dan validasi
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Membatasi ukuran file maksimal 5MB
});

module.exports = upload;
