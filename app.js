require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const multer = require('multer');
const cron = require('node-cron');
const { ensureAuthenticated } = require('./Front/middleware/auth');
const fetch = (...args) => import('node-fetch').then(module => module.default(...args));


// Importar rutas
const RegistroRoutes = require('./Back/routes/registroRoutes');
const reportRoutes = require('./Front/routes/reportRoutes');
const userRoutes = require('./Front/routes/userRoutes');
const mascotaRoutes = require('./Front/routes/mascotaRoutes');
// Inicializar Express
const app = express();
const server = http.createServer(app);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Front/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Front', 'views'));
app.use(expressLayouts);

// Configurar carpeta pública para los avatares
app.use('/images', express.static(path.join(__dirname, 'Front', 'public', 'images')));

// Configurar carpeta pública para otros archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'Front', 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'Front', 'uploads')));

// Configurar sesión
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Inicializar Passport
const initializePassport = require('./Front/passportConfig');
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware para pasar datos a las vistas
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  res.locals.userId = req.session.userId || null;
  res.locals.propietarioId = req.session.propietarioId || null;
  res.locals.dominio = process.env.DOMINIO;

  next();
});

app.post('/upload', upload.single('foto'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se subió ningún archivo.');
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});


// Configurar rutas de la aplicación (protegidas por autenticación)
app.use('/api', RegistroRoutes); // Rutas de registro
app.use('/mis-mascotas', ensureAuthenticated, mascotaRoutes); // Rutas de mascotas protegidas
app.use('/info', ensureAuthenticated, reportRoutes); // Rutas de reportes protegidas
app.use('/users', userRoutes); // Rutas de usuarios
app.use('/', ensureAuthenticated, mascotaRoutes); // Ruta protegida para mascotas

// Ruta raíz con autenticación
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/'); 
  } else {
    res.redirect('/users/login');
  }
});

// Ruta protegida ejemplo
app.get('/', ensureAuthenticated, (req, res) => {
  res.render('index'); // Vista home.ejs
});

// Función para enviar correos 
const api_url = process.env.API_URL
async function sendEmail(email, subject, body) {
  const url = 'https://script.google.com/macros/s/AKfycbwF6GJYqK6jDVtzEsa5HRc86UQHJ-szkNISQtKJ-U9gZcjqu47i0h20tg-VyEQvWfQD/exec'; // URL de tu WebApp o endpoint

  // Datos que se enviarán en la solicitud POST
  const data = new URLSearchParams();
  data.append('email', email);
  data.append('subject', subject);
  data.append('body', body);

  try {
      // Solicitud fetch POST asincrónica
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data.toString()
      });

      // Procesa la respuesta del servidor
      const result = await response.text();
      console.log('Correo enviado:', result);

  } catch (error) {
      // Maneja cualquier error en la solicitud
      console.error('Error:', error);
  }
};

// Función para obtener los recordatorios de la API y enviar correos
async function obtenerYEnviarRecordatorios() {
  const url = `${api_url}/api/mascotas/recordatorio`; // Ajusta la URL base de tu API

  try {
      // Llamada a la API para obtener los recordatorios
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
      }

      // Convierte la respuesta a JSON
      const recordatorios = await response.json();

      // Itera sobre los recordatorios y envía correos
      for (const recordatorio of recordatorios) {
          const { nombrePropietario, email, nombreMascota, medicamento, proxima_fecha_aplicacion, nombreVeterinario } = recordatorio;

          // Crear el asunto y el cuerpo del correo
          const subject = `Recordatorio de Vacuna para ${nombreMascota}`;
          const body = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #487B68;">Hola ${nombrePropietario},</h2>
        <p>Te recordamos que la próxima vacuna de <strong>${nombreMascota}</strong> (${medicamento}) será el día <strong>${new Date(proxima_fecha_aplicacion).toLocaleDateString()}</strong>.</p>
        <p><strong>Veterinario encargado:</strong> ${nombreVeterinario}</p>
        <p>Por favor, asegúrate de llevar a tu mascota para que reciba la vacuna a tiempo.</p>
        <p style="margin-top: 20px;">¡Gracias!</p>
        <footer style="margin-top: 30px; font-size: 0.9em; color: #999;">
          <hr style="border: none; border-top: 1px solid #ccc;">
          <p>Este es un mensaje automático. Por favor, no responda a este correo.</p>
        </footer>
      </div>
    `;
          // Llamar a la función sendEmail para enviar el correo
          await sendEmail(email, subject, body);
      }

  } catch (error) {
      console.error(`Error al obtener o enviar recordatorios: ${api_url}`, error);
  }
}


// Tarea programada para ejecutarse todos los días a las 00:00

cron.schedule('51 5 * * *', () => {
  console.log('Ejecutando tarea diaria a las 4:00 PM ');
  obtenerYEnviarRecordatorios(); // Llamar a la función que obtiene y envía los correos
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
const fecha = new Date();
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(fecha)
});
