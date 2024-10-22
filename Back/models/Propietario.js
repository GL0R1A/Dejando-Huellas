const db = require('../config/db');

const Propietario = {
  create: (propietarioData, callback) => {
    const { nombres, apellidos, direccion, telefono,  usuario_id } = propietarioData;
    db.query(
      'INSERT INTO propietarios (nombres, apellidos, direccion, telefono,  usuario_id) VALUES (?, ?, ?, ?, ?)',
      [nombres, apellidos, direccion, telefono,  usuario_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result.insertId);
      }
    );
  },
  findById: (usuario_id, callback) => {
    db.query('SELECT * FROM propietarios WHERE usuario_id = ?', [usuario_id], callback);
  },
};

module.exports = Propietario;
