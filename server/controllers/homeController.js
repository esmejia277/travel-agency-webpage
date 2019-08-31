const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.queryHome = async (req, res) => {
    const viajes = await Viaje.findAll({limit: 3 })
    const testimonial = await Testimonial.findAll({limit: 3})
    res.render('index', {
        page: 'Próximos viajes',
        clase: 'home',
        travel : viajes,
        testimonial
    });
}