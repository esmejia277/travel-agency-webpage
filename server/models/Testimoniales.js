const db = require('../config/database');
const Sequealize = require('sequelize');

const Testimonial = db.define('testimoniales', {
    nombre : {
        type: Sequealize.STRING,
    },
    correo: {
        type: Sequealize.STRING,
    },
    mensaje: {
        type: Sequealize.STRING
    },
});

module.exports = Testimonial;
