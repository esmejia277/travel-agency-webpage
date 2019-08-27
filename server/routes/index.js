const express = require('express');
const router = express.Router();
const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = () => {
    router.get('/', (req, res) => {
        const promises = []
        promises.push(
            Viaje.findAll({
                limit: 3
            })
        )

        promises.push(
            Testimonial.findAll({
                limit: 3
            })
        )
        const result = Promise.all(promises);
        result.then((result) => {
            res.render('index', {
                page: 'Próximos viajes',
                clase: 'home',
                travel : result[0],
                testimonial : result[1]
            });
        }).catch((err) => {
            console.log('error' ,err);
        });
    });
    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            page: 'Sobre nosotros'
        });
    });
    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then((viajes) => {
                res.render('viajes', {
                    page: 'Próximos viajes',
                    travel: viajes
                });
            }).catch((err) => {
                console.log('error' ,err);
            });
    });

    router.get('/viajes/:id', (req, res) => {
        Viaje.findByPk(req.params.id)
            .then((viaje) => {
                res.render('viaje', {
                    travel: viaje
                });
            }).catch((err) => {
                console.log('error', err);
            });
    });
    router.get('/testimonios', (req, res) => {
        Testimonial.findAll()
            .then((testimonial) => {
                res.render('testimoniales', {
                    page: 'Testimoniales',
                    testimonial
                });
            }).catch((error) => console.log('error', error));
    });

    router.post('/testimonios', (req, res) => {
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

    });
    return router;
}