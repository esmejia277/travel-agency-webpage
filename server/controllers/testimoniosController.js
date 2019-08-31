const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimonios = async (req, res) => {
    const testimonial = await Testimonial.findAll()
        res.render('testimoniales', {
            page: 'Testimoniales',
            testimonial
        });
}

exports.agregarTestimonio = async (req, res) => {
    let { nombre, correo, mensaje } = req.body
    let errors = []
    if (!nombre){
        errors.push({
            'mensaje':'Agrega tu nombre'
        })
    }
    if (!correo){
        errors.push({
            'mensaje':'Agrega tu correo'
        })
    }
    if (!mensaje){
        errors.push({
            'mensaje':'Agrega tu mensaje'
        })
    }

    if (errors.length > 0){
        const testimonial = await Testimonial.findAll()
        res.render('testimoniales', {
            errors,
            nombre,
            correo,
            mensaje
        })
    }else{
        Testimonial.create({
            nombre,
            correo,
            mensaje
        }).then( testimonial => res.redirect('/testimonios'))
            .catch(error => console.log('error', error));

    }
}