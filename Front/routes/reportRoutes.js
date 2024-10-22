const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Ruta para renderizar la vista
router.get('/:identificador_qr', reportController.infoQR);
router.get('/ReporteAparicion/:identificador_qr', reportController.infoReporteAparicion);

// Ruta para hacer el fetch
router.get('/qr/:identificador_qr', reportController.mascotaQR);
router.get('/infoReporteAparicion/:identificador_qr', reportController.getReporteAperecidos);


router.post('/reporte/Apa', reportController.reporteAparecidos);
router.post('/reporte/Des', reportController.reporteDesaparecidos);
router.get('/reporte/getReporteDes', reportController.getReporteDesaparecidos);
router.put('/eliminarReporte/:mascota_id', reportController.eliminarReporte);

module.exports = router;
