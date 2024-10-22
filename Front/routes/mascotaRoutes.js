
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const mascotaController = require('../controllers/mascotaController');

//vistas
router.get('/', ensureAuthenticated, mascotaController.showIndex);

router.get('/reportesMascotas', ensureAuthenticated, mascotaController.showreportesMascotas);
router.get('/mias-mascotas/detalles/vacunas/imprimir/:mascota_id', ensureAuthenticated, mascotaController.vistaImpresion);
router.get('/consejos', ensureAuthenticated, mascotaController.showConsejos);
router.get('/mias-mascotas', ensureAuthenticated, mascotaController.showMisMascotas);
router.get('/mias-mascotas/detalles/:id', ensureAuthenticated, mascotaController.showDetalles);
router.get('/mias-mascotas/detalles/vacunas/:id', ensureAuthenticated, mascotaController.showVacunas);
router.get('/mias-mascotas/detalles/vacunas/getVacunas/:id', ensureAuthenticated, mascotaController.obtenerVacunas);
router.post('/mias-mascotas/detalles/vacunas/registrar', ensureAuthenticated, mascotaController.registrarVacunacion);
router.put('/mias-mascotas/detalles/vacunas/actualizar/:id_vacunacion', ensureAuthenticated, mascotaController.actualizarVacunacion);
router.delete('/mias-mascotas/detalles/vacunas/eliminar/:id_vacunacion', ensureAuthenticated, mascotaController.eliminarVacunacion);
router.get('/mias-mascotas/detalles/vacunas/imprimir/reporte/:mascota_id', ensureAuthenticated, mascotaController.getReporteimprimir);


router.get('/especies', mascotaController.obtenerEspecies);
router.get('/generos', mascotaController.obtenerGeneros);

router.get('/mis-mascotas', mascotaController.misMascotas);


// Ruta para procesar el formulario de registro de mascota
router.post('/registrar', mascotaController.registrarMascota);
router.put('/actualizar/:mascota_id', mascotaController.actualizarMascota);
router.put('/eliminar/:mascota_id', mascotaController.eliminarMascota);

module.exports = router;