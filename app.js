// Punto de entrada de la aplicación Express
const express = require('express');
const methodOverride = require('method-override'); // permite PUT y DELETE desde formularios HTML
const path = require('path');

const indexRouter = require('./routes/index');
const topicRoutes = require('./routes/topicRoutes');
const voteRoutes = require('./routes/voteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Configuración del motor de plantillas ---
app.set('view engine', 'ejs');                        // usa EJS como template engine
app.set('views', path.join(__dirname, 'views'));       // carpeta de vistas

// --- Middlewares ---
app.use(express.static(path.join(__dirname, 'public'))); // archivos estáticos (CSS, JS)
app.use(express.urlencoded({ extended: true }));          // parsea formularios HTML
app.use(express.json());                                  // parsea cuerpos JSON
app.use(methodOverride('_method'));                       // interpreta _method en query string

// --- Rutas ---
app.use('/', indexRouter);           // ruta raíz
app.use('/topics', topicRoutes);     // CRUD de topics y links
app.use('/vote', voteRoutes);        // sistema de votación

// --- Página de error 404 ---
app.use((req, res) => {
  res.status(404).render('404');
});

// --- Inicia el servidor ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
