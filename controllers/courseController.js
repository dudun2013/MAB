// controllers/courseController.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config');  // Pastikan path relatif benar
const { Course } = require('../models/Course'); // Asumsikan Course adalah model yang ada

const getCourses = async (req, res) => {
    const { filter, sortBy, search } = req.query; // Mengambil query params
    
    try {
        // Membuat query dasar untuk mengambil semua data Course
        let whereConditions = {};

        // 1. Filtering (menggunakan filter)
        if (filter) {
            // Misalnya filter berdasarkan kategori atau status, misalnya: filter=status
            const filterParams = filter.split(','); // Jika filter berupa kombo kategori,status
            filterParams.forEach(param => {
                const [key, value] = param.split(':'); // Misalnya 'category:Programming'
                if (key && value) {
                    whereConditions[key] = value;
                }
            });
        }

        // 2. Searching (gunakan LIKE di kolom tertentu, misalnya title atau description)
        if (search) {
            whereConditions[Sequelize.Op.or] = [
                { title: { [Sequelize.Op.like]: `%${search}%` } },
                { description: { [Sequelize.Op.like]: `%${search}%` } },
            ];
        }

        // 3. Sorting (jika ada sortBy)
        const order = sortBy ? [[sortBy, 'ASC']] : [['createdAt', 'DESC']]; // Default: urutkan berdasarkan createdAt

        // Query untuk mengambil data dengan kondisi di atas
        const courses = await Course.findAll({
            where: whereConditions,
            order: order,
        });

        // Mengirimkan response
        res.status(200).json({
            message: 'Courses retrieved successfully',
            data: courses,
        });
    } catch (error) {
        console.error(error);  // Logging error untuk debugging
        res.status(500).json({
            message: 'Error retrieving courses',
            error: error.message,
        });
    }
};

module.exports = { getCourses };


