const Reporte = require('../models/Reportes');
const Mascota = require('../models/Mascota');



//Reporte Aparecidos
exports.reportarA = (req, res) => {
  const {
    nombre_reporta,
    correo_reporta,
    fecha_reporta,
    telefono_reporta,
    descripcion_reporta,
    mascota_id,
    latitud,
    longitud,
    nombreUbicacion,
    descripcionUbicacion,
  } = req.body;

  const ReporteData = {
    nombre_reporta,
    correo_reporta,
    fecha_reporta,
    telefono_reporta,
    descripcion_reporta,
    mascota_id,
  };
 

  const ubicacionData = {
    nombre: nombreUbicacion,
    latitud,
    longitud,
    descripcion_adicional: descripcionUbicacion,
  };

  // Inserta la ubicación primero
  Mascota.createUbicacion(ubicacionData, (err, ubicacionId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar ubicación' });
    }

    // Agrega el ID de la ubicación al objeto ReporteData
    ReporteData.ubicacion_id = ubicacionId;
    

    // Luego inserta el reporte
    Reporte.createRA(ReporteData, (err, response) => {
      if (err) {
        // Maneja el error en caso de que ya exista un reporte activo
        if (err.status === 400) {
          return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: `Error al crear reporte de Aparicion ${err}` });
      }

      // Responde con éxito si todo salió bien
      res.status(response.status).json({ message: response.message, reporteId: response.id });
    });
  });
};


//Reporte Desaparecidos
exports.reportarD = (req, res) => {
  const {
    fecha_desaparicion,
    hora_desaparicion,
    descripcion_desaparicion,
    latitud,
    longitud,
    nombreUbicacion,
    descripcionUbicacion,
    mascotaid_desaparicion
  } = req.body;

  const ReporteData = {
    fecha_desaparicion,
    hora_desaparicion,
    descripcion_desaparicion,
    mascotaid_desaparicion
  };

  const ubicacionData = {
    nombre: nombreUbicacion,
    latitud,
    longitud,
    descripcion_adicional: descripcionUbicacion,
  };

  // Inserta la ubicación primero
  Mascota.createUbicacion(ubicacionData, (err, ubicacionId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar ubicación' });
    }

    // Agrega el ID de la ubicación al objeto ReporteData
    ReporteData.ubicacionid_desaparicion = ubicacionId;

    // Luego inserta el reporte
    Reporte.createRD(ReporteData, (err, response) => {
      if (err) {
        // Maneja el error en caso de que ya exista un reporte activo
        if (err.status === 400) {
          return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Error al crear reporte', error: err.error });
      }

      // Responde con éxito si todo salió bien
      res.status(response.status).json({ message: response.message, reporteId: response.id });
    });
  });
};


exports.getReporteDesaparecidos = (req, res) => {
  Reporte.findReportesDesaparecidos((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No hay Reportes' });
    }
    res.send(result);
  });
};
exports.deleteReport= (req, res) => {
  const mascota_id = req.params.mascota_id;

  Reporte.deleteReport(mascota_id, (err, affectedRows) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (affectedRows === 0) {
      return res.status(404).send({ message: 'No se ha encontrado la mascota especificada' });
    }
    res.status(200).send({ message: 'Reporte eliminado con éxito' });
  });
};

exports.getRepoteAparecidos= (req, res) => {
  const identificador_qr = req.params.identificador_qr;
  Reporte.getInfoReporteAp(identificador_qr, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No se encontró el reporte' });
    }
    res.send(result);
  });
};

exports.getReporteImprimir = (req, res) => {
  const mascota_id = req.params.mascota_id;
  Reporte.getInfoImprimir(mascota_id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No se encontró la mascota' });
    }
    res.send(result);
  });
};