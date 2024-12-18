// config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('video_belajar', 'root', 'Dudunsuparmaidi1974', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
