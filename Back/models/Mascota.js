const db = require('../config/db');
const crypto = require('crypto');

const Mascota = {
  create: (mascotaData, callback) => {
    const { nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica, ubicacionId } = mascotaData;

    // Generar el identificador QR
    const identificador_qr = crypto.randomBytes(16).toString('hex');

    const query = `
      INSERT INTO mascotas (nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica, identificador_qr, ubicacionId) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    db.query(query, [nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica, identificador_qr, ubicacionId], (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, result.insertId);
    });
  },
  createUbicacion: (ubicacionData, callback) => {
    const { nombre, latitud, longitud, descripcion_adicional } = ubicacionData;

    const query = `
      INSERT INTO ubicaciones (nombre, latitud, longitud, descripcion_adicional) 
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [nombre, latitud, longitud, descripcion_adicional], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  },
  findMisMascotas: (propietario_id, callback) => {

    db.query(`select m.mascota_id, m.nombre, m.especie_id, e.nombre_especie, m.raza, m.genero_id, g.nombre_genero, m.fecha_nacimiento, m.desaparecido,
       m.color, m.peso, m.foto, m.enfermedad_cronica, m.identificador_qr, 
       u.ubicacion_id, u.nombre as nombre_lugar, u.descripcion_adicional as descripcion_lugar, u.latitud, u.longitud
    from mascotas m
    inner join especies e on e.especie_id = m.especie_id
    inner join generos g on g.genero_id = m.genero_id
    inner join ubicaciones u on u.ubicacion_id = m.ubicacionId
    where m.propietario_id = ? and activo = 1 order by m.mascota_id desc` , [propietario_id], callback);
  },
  findbyQr: (identificador_qr, callback) => {
    db.query(`select m.mascota_id, m.nombre, e.nombre_especie, m.raza, g.nombre_genero, m.fecha_nacimiento, m.color, m.peso, m.foto, m.enfermedad_cronica, m.identificador_qr,
  concat(p.nombres, ' ', p.apellidos)as propietario, p.direccion as residencia, p.telefono, u.email as correo, 
  ub.nombre as nombre_ubicacion, ub.latitud, ub.longitud, ub.descripcion_adicional
  from mascotas m
  inner join especies e on e.especie_id = m.especie_id
  inner join generos g on g.genero_id = m.genero_id
  inner join propietarios p on m.propietario_id= p.propietario_id
  inner join usuarios u on p.usuario_id = u.usuario_id
  inner join ubicaciones ub on ub.ubicacion_id = m.ubicacionId
  where m.identificador_qr = ?` , [identificador_qr], callback);
  },

  update: (mascota_id, mascotaData, callback) => {
    const { nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica, ubicacionId } = mascotaData;
    const query = `
      UPDATE mascotas 
      SET nombre = ?, especie_id = ?, raza = ?, genero_id = ?, fecha_nacimiento = ?, color = ?, peso = ?, foto = ?, propietario_id = ?, enfermedad_cronica = ?, ubicacionId=?
      WHERE mascota_id = ? 
    `;

    db.query(query, [nombre, especie_id, raza, genero_id, fecha_nacimiento, color, peso, foto, propietario_id, enfermedad_cronica, ubicacionId, mascota_id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },

  updateUbicacion: (ubicacion_id, ubicacionData, callback) => {
    const { nombreUbicacion, latitud, longitud, descripcion_adicional } = ubicacionData;
    const query = `
      UPDATE ubicaciones 
      SET nombre = ?, latitud = ?, longitud = ?, descripcion_adicional = ?
      WHERE ubicacion_id = ? 
    `;

    db.query(query, [nombreUbicacion, latitud, longitud, descripcion_adicional, ubicacion_id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },

  delete: (mascota_id, callback) => {
    const query = `
         UPDATE mascotas 
      SET activo = 0
      WHERE mascota_id = ? 
    `;

    db.query(query, mascota_id, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },

  deleteVacunacion: (id_vacunacion, callback) => {
    const query = `
         Delete  from
      vacunacion
      WHERE id_vacunacion= ? 
    `;

    db.query(query, id_vacunacion, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },

  createVacunacion: (vacunacionData, callback) => {
    const { medicamento, dosis, descripcion_adicional, fecha_aplicacion, proxima_fecha_aplicacion, nombre_veterinario, id_mascota } = vacunacionData;

    const query = `
      INSERT INTO vacunacion (medicamento, dosis, descripcion_adicional, fecha_aplicacion, proxima_fecha_aplicacion, nombre_veterinario, id_mascota) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [medicamento, dosis, descripcion_adicional, fecha_aplicacion, proxima_fecha_aplicacion, nombre_veterinario, id_mascota], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    });
  },

  updateVacunacion: (id_vacunacion, vacunacionData,  callback) => {
    const { medicamento, dosis, descripcion_adicional, fecha_aplicacion, nombre_veterinario, id_mascota } = vacunacionData;
    const proxima_fecha_aplicacion = vacunacionData.proxima_fecha_aplicacion || null;
   const query = `
    UPDATE vacunacion 
    SET \`medicamento\` = ?, \`dosis\` = ?, \`descripcion_adicional\` = ?, \`fecha_aplicacion\` = ?, \`proxima_fecha_aplicacion\` = ?, \`nombre_veterinario\` = ?, \`id_mascota\` = ?
    WHERE \`id_vacunacion\` = ? 
  `;

    db.query(query, [medicamento, dosis, descripcion_adicional, fecha_aplicacion, proxima_fecha_aplicacion, nombre_veterinario, id_mascota, id_vacunacion], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result.affectedRows);
    });
  },


  getVacunacion: (mascota_id, callback) => {
    db.query(`select v.id_vacunacion , v.medicamento, v.dosis, v.descripcion_adicional, v.fecha_aplicacion, v.proxima_fecha_aplicacion, v.nombre_veterinario, m.nombre from vacunacion v
      inner join mascotas m on m.mascota_id = id_mascota
      where v.id_mascota =  ?` , [mascota_id], callback);
  },
};

module.exports = Mascota;
