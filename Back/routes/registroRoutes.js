const express = require('express');
const registroController = require('../controllers/registroController');
const mascotaController = require('../controllers/mascotaController');
const reportesController = require('../controllers/reportesController')


const router = express.Router();

router.post('/registro', registroController.registrar);
router.get('/usuarios/username/:username', registroController.getUserByUsername);
router.get('/usuarios/id/:usuario_id', registroController.getUserById);

router.get('/Propietarios/id/:usuario_id', registroController.getPropietarioById);

router.get('/mascotas/especies', mascotaController.getEspeciesAll);
router.get('/mascotas/generos', mascotaController.getGenerosAll);

router.get('/mascotas/vacunas/imprimir/:mascota_id', reportesController.getReporteImprimir);

router.get('/infoqr/:identificador_qr', mascotaController.getMascotabyQr);
router.get('/mascotas/vacunas/:mascota_id', mascotaController.getVacunacion);

router.delete('/mascotas/vacunas/:id_vacunacion', mascotaController.deleteVacunacion);
router.put('/mascotas/vacunas/update/:id_vacunacion', mascotaController.updateVacunacion);
// Ruta para crear una nueva mascota
router.post('/mascotas', mascotaController.createMascota);
router.post('/mascotas/ubicaciones', mascotaController.createubicacion);
router.post('/mascotas/vacunas', mascotaController.createVacunacion);
router.put('/mascotas/update/:mascota_id', mascotaController.updateMascota);
router.put('/mascotas/delete/:mascota_id', mascotaController.deleteMascota);

router.get('/mascotas/mismascotas/:propietario_id', mascotaController.getMisMascotas);

// Nueva ruta para actualizar la contraseña
router.put('/usuarios/update-password', registroController.updatePassword);

router.post('/nuevo/reporteApa', reportesController.reportarA);
router.post('/nuevo/reporteDes', reportesController.reportarD);
router.get('/get/reporteDes', reportesController.getReporteDesaparecidos);
router.get('/get/reporteApa/:identificador_qr', reportesController.getRepoteAparecidos);
router.put('/deleteReport/:mascota_id', reportesController.deleteReport);

module.exports = router;
