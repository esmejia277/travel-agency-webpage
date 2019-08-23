const express = require('express');
const router = express.Router();
const Viaje = require('../models/Viajes');

module.exports = () => {
    router.get('/', (req, res) => {
        res.render('index');
    });
    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            page: 'Sobre nosotros'
        });
    });
    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then((viajes) => {
                console.log(viajes);
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
    return router;
}