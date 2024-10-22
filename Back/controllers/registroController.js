const Usuario = require('../models/Usuario');
const Propietario = require('../models/Propietario');
const bcrypt = require('bcryptjs');

exports.registrar = (req, res) => {
  const { nombre_usuario, email, contraseña, nombres, apellidos, direccion, telefono } = req.body;

  Usuario.create({ nombre_usuario, email, contraseña }, (err, usuarioId) => {
    if (err) {
      if (err.message.includes("Duplicate entry")) {
        if (err.message.includes("for key 'usuarios.nombre_usuario'")) {
          return res.status(400).json({ error: 'El nombre de usuario ya existe' });
        } else if (err.message.includes("for key 'usuarios.email'")) {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }
      }
      return res.status(500).json({ error: err.message });
    }

    const propietarioData = { nombres, apellidos, direccion, telefono, usuario_id: usuarioId };

    Propietario.create(propietarioData, (err, propietarioId) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({ message: 'Registro exitoso', propietarioId });
    });
  });
};

exports.getUserByUsername = (req, res) => {
  const nombre_usuario = req.params.username;

  Usuario.findByUsername(nombre_usuario, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(result[0]);
  });
};

exports.getUserById = (req, res) => {
  const usuario_id = req.params.usuario_id;
  Usuario.findById(usuario_id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(result[0]);
  });
};

exports.getPropietarioById = (req, res) => {
  const usuario_id = req.params.usuario_id;
  Propietario.findById(usuario_id, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send({ message: 'Propietario no Encontado' });
    }
    res.send(result[0]);
  });
};

exports.updatePassword = async (req, res) => {
  const { username, email, newPassword } = req.body;
  let errors = [];

  if (!username || !email || !newPassword) {
    errors.push('Por favor, completa todos los campos');
    return res.status(400).json({ errors });
  }

  try {
    // Verificar si el usuario existe y el correo coincide
    Usuario.findByUsername(username, async (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        errors.push('Usuario no encontrado');
        return res.status(404).json({ errors });
      }

      const user = result[0];
      if (user.email !== email) {
        errors.push('El correo no coincide');
        return res.status(400).json({ errors });
      }

      // Hashear la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Actualizar la contraseña en la base de datos
      Usuario.updatePassword(user.usuario_id, hashedPassword, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
      });
    });
  } catch (err) {
    errors.push('Error de conexión con la API');
    return res.status(500).json({ errors });
  }
};
