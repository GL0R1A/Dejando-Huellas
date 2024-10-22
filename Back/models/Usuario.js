const db = require('../config/db');

const Usuario = {
  create: (userData, callback) => {
    const { nombre_usuario, email, contraseña } = userData;
    db.query(
      'INSERT INTO usuarios (nombre_usuario, email, contraseña) VALUES (?, ?, ?)',
      [nombre_usuario, email, contraseña],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result.insertId);
      }
    );
  },
  findByUsername: (nombre_usuario, callback) => {
    db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario], callback);
  },
  findById: (usuario_id, callback) => {
    db.query('SELECT * FROM usuarios WHERE usuario_id = ?', [usuario_id], callback);
  },
  updatePassword: (usuario_id, newPassword, callback) => {
    db.query('UPDATE usuarios SET contraseña = ? WHERE usuario_id = ?', [newPassword, usuario_id], callback);
  }
};

module.exports = Usuario;
