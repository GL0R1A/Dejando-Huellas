const bcrypt = require('bcryptjs');
//import fetch from 'node-fetch';
const fetch = (...args) => import('node-fetch').then(module => module.default(...args));
const API_URL = process.env.API_URL || 'http://localhost:8080';
exports.showRegister = (req, res) => {
  res.render('register', { layout: false, errors: [], success: req.session.success });
  delete req.session.success;
};

exports.showLogin = (req, res) => {
  res.render('login', { layout: false, errors: [] });
};

exports.register = async (req, res) => {
  const { nombre_usuario, email, contraseña, nombres, apellidos, direccion, telefono } = req.body;
  let errors = [];

  if (!nombre_usuario || !email || !contraseña || !nombres || !apellidos || !direccion || !telefono) {
    errors.push('Por favor, completa todos los campos');
    return res.status(400).json({ message: errors.join(', ') });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const response = await fetch(`${API_URL}/api/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_usuario, email, contraseña: hashedPassword, nombres, apellidos, direccion, telefono })
    });

    const result = await response.json();

    if (response.ok) {
      req.session.success = 'Registro exitoso. Por favor, inicia sesión.';
      return res.status(200).json({ message: 'Registro exitoso' });
    } else {
      if (result.error && result.error.includes("Duplicate entry")) {
        if (result.error.includes("for key 'usuarios.nombre_usuario'")) {
          return res.status(400).json({ message: 'El nombre de usuario ya existe' });
        } else if (result.error.includes("for key 'usuarios.email'")) {
          return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }
      }
      return res.status(400).json({ message: result.message || 'Error al registrar el usuario' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error de conexión con la API' });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  let errors = [];

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor, completa todos los campos' });
  }

  try {
    const response = await fetch(`${API_URL}/api/usuarios/username/${username}`);
    const user = await response.json();

    if (!response.ok) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    req.logIn(user, async (err) => {
      if (err) return next(err);

      // Obtener el ID del propietario
      try {
        const propietarioResponse = await fetch(`${API_URL}/api/propietarios/id/${user.usuario_id}`);
        const propietarioResult = await propietarioResponse.json();

        if (propietarioResponse.ok && propietarioResult.propietario_id) {
          req.session.username = user.nombre_usuario;
          req.session.userId = user.usuario_id;
          req.session.propietarioId = propietarioResult.propietario_id;

          return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
          console.error('Error en la respuesta de la API de propietarios:', propietarioResult);
          return res.status(400).json({ message: 'Error al obtener el ID del propietario' });
        }
      } catch (err) {
        console.error('Error de conexión con la API de propietarios:', err);
        return res.status(500).json({ message: 'Error de conexión con la API de propietarios' });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error de conexión con la API' });
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/users/login');
  });
};
