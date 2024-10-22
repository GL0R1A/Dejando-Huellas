const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas de vistas
router.get('/register', userController.showRegister);
router.get('/login', userController.showLogin);

// Rutas de acciones
router.post('/register', userController.register);
router.post('/getlogin', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
