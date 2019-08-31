const express = require('express');
const router = express.Router();
const nosotrosController = require('../controllers/nosotrosController');
const homeController = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController');
const testimoniosController = require('../controllers/testimoniosController');

module.exports = () => {
    router.get('/', homeController.queryHome);
    router.get('/nosotros', nosotrosController.infoNosotros);
    router.get('/viajes', viajesController.mostrarViajes );
    router.get('/viajes/:id', viajesController.mostrarViaje);
    router.get('/testimonios', testimoniosController.mostrarTestimonios);
    router.post('/testimonios', testimoniosController.agregarTestimonio);
    return router;
}