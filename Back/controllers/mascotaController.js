const Especies = require('../models/Especies');
const Generos = require('../models/Generos');
const Mascota = require('../models/Mascota');

exports.getEspeciesAll = (req, res) => {
  Especies.findEspecies((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No hay especies' });
    }
    res.send(result);
  });
};

exports.getGenerosAll = (req, res) => {
  Generos.findGeneros((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No hay generos' });
    }
    res.send(result);
  });
};

exports.createMascota = (req, res) => {
  const {
    nombre,
    especie_id,
    raza,
    genero_id,
    fecha_nacimiento,
    color,
    peso,
    foto,
    propietario_id,
    enfermedad_cronica,
    nombreUbicacion,
    latitud,
    longitud,
    descripcion_adicional
  } = req.body;

  // Verificación de datos de geolocalización
  if (!nombreUbicacion || !latitud || !longitud) {
    return res.status(400).json({
      error: 'Datos de geolocalización incompletos. Se requiere nombre de la ubicación, latitud y longitud.'
    });
  }

  const mascotaData = {
    nombre,
    especie_id,
    raza,
    genero_id,
    fecha_nacimiento,
    color,
    peso,
    foto,
    propietario_id,
    enfermedad_cronica: enfermedad_cronica || 'No tiene', // Valor por defecto si no se proporciona
  };

  const ubicacionData = {
    nombre: nombreUbicacion,
    latitud,
    longitud,
    descripcion_adicional,
  };

  // Inserta la ubicación primero
  Mascota.createUbicacion(ubicacionData, (err, ubicacionId) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar ubicación' });
    }

    // Agrega el ID de la ubicación al objeto mascota
    mascotaData.ubicacionId = ubicacionId;

    // Luego inserta la mascota
    Mascota.create(mascotaData, (err, mascotaId) => {
      if (err) {
        return res.status(500).json({ error: 'Error al registrar mascota', err });
      }

      // Responde con éxito si todo salió bien
      res.status(201).json({ message: 'Mascota Creada', mascotaId });
    });
  });
};

exports.createubicacion = (req, res) => {
  const { nombreUbicacion, latitud, longitud, descripcion_adicional } = req.body;

  const ubicacionData = {
    nombreUbicacion, latitud, longitud, descripcion_adicional
  };

  Mascota.createUbicacion(ubicacionData, (err, ubicacion_id) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar ubicacion' });
    }
    res.status(201).json({ message: 'Ubicacion registrada con éxito', ubicacion_id });
  });
};


exports.getMisMascotas = (req, res) => {
  const propietario_id = req.params.propietario_id;
  Mascota.findMisMascotas(propietario_id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No hay Mascotas' });
    }
    res.send(result);
  });
};

exports.getMascotabyQr = (req, res) => {
  const identificador_qr = req.params.identificador_qr;
  Mascota.findbyQr(identificador_qr, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'No se encontró la mascota' });
    }
    res.send(result);
  });
};

exports.updateMascota = (req, res) => {
  const mascota_id = req.params.mascota_id;
  const mascotaData = req.body;
  const ubicacionid = mascotaData.ubicacionId;
  const { nombreUbicacion, latitud, longitud, descripcion_adicional } = mascotaData;
  const ubicacionData = {
    nombreUbicacion,
    latitud,
    longitud,
    descripcion_adicional,
};

  Mascota.update(mascota_id, mascotaData, (err, affectedRows) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (affectedRows === 0) {
      return res.status(404).send({ message: 'Mascota no encontrada o no actualizada' });
    }
    else{
      Mascota.updateUbicacion(ubicacionid, ubicacionData, (err, affectedRows) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (affectedRows === 0) {
          return res.status(404).send({ message: 'Ubicacion no encontrada o no actualizada' });
        }
        res.status(200).send({ message: 'Mascota actualizada con éxito' });
      })
      
      
    }
   
  });
};
exports.deleteMascota = (req, res) => {
  const mascota_id = req.params.mascota_id;

  Mascota.delete(mascota_id, (err, affectedRows) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (affectedRows === 0) {
      return res.status(404).send({ message: 'Mascota no encontrada o no eliminada' });
    }
    res.status(200).send({ message: 'Mascota eliminada con éxito' });
  });
};

exports.createVacunacion = (req, res) => {
  const { 
    medicamento, 
    dosis, 
    descripcion_adicional, 
    fecha_aplicacion, 
    proxima_fecha_aplicacion, // Corrección en el nombre del campo
    nombre_veterinario, 
    id_mascota 
  } = req.body;

  // Validación de campos obligatorios
  if (!medicamento || !fecha_aplicacion || !nombre_veterinario || !id_mascota) {
    return res.status(400).json({ error: 'Los campos medicamento, fecha de aplicación, nombre del veterinario e id de mascota son obligatorios.' });
  }

  const vacunacionData = {
    medicamento, 
    dosis, 
    descripcion_adicional, 
    fecha_aplicacion, 
    proxima_fecha_aplicacion, 
    nombre_veterinario, 
    id_mascota
  };

  Mascota.createVacunacion(vacunacionData, (err, ubicacion_id) => {
    if (err) {
      console.error('Error al registrar la vacunación:', err); // Para diagnóstico
      return res.status(500).json({ error: 'Error al registrar Vacunación' });
    }
    res.status(201).json({ message: 'Vacunación registrada con éxito', ubicacion_id });
  });
};

exports.updateVacunacion = (req, res) => {
  const id_vacunacion = req.params.id_vacunacion; 
  const data = req.body;

  Mascota.updateVacunacion(id_vacunacion, data, (err, affectedRows) => {
    if (err) {
 
      return res.status(500).json({ error: 'Error al editar Vacunación' });
    }
    if (affectedRows === 0) {
      return res.status(404).send({ message: 'Vacunacion no actualizada' });
    }
        res.status(200).send({ message: 'Vacunacion actualizada con éxito' });

  });
};

exports.deleteVacunacion = (req, res) => {
  const id_vacunacion = req.params.id_vacunacion; // Obtener el id de la vacunación desde los parámetros de la URL

  Mascota.deleteVacunacion(id_vacunacion, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result === 0) {
      return res.status(404).send({ message: `No se encontró la vacunación con ID ${id_vacunacion}` });
    }
    res.send({ message: `Vacunación con ID ${id_vacunacion} eliminada exitosamente.` });
  });
};

exports.getVacunacion = (req, res) => {
  const mascota_id = req.params.mascota_id;
  Mascota.getVacunacion(mascota_id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: `No se encontró datos de vacunacion de la mascota ${mascota_id}` });
    }
    res.send(result);
  });
};