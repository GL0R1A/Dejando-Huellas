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

// Tarea programada para ejecutarse todos los días a las 00:00
cron.schedule('30 10 * * *', () => {
  console.log('Ejecutando tarea diaria a las 00:00');

});


// Iniciar servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
