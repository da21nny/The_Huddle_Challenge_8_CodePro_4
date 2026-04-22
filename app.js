// ===== Imports =====
import path from "path";
import { fileURLToPath } from "url";
import express, { json, urlencoded } from "express";
import methodOverride from "method-override"; // Permite usar PUT y DELETE en formularios HTML
import { initDB } from "./src/config/db.js"; // Función para crear las tablas
import topicRoutes from "./src/routes/topicRoutes.js";
import linkRoutes from "./src/routes/linkRoutes.js";
import { engine } from "express-handlebars";

// ===== Configuración de rutas del sistema =====
const __filename = fileURLToPath(import.meta.url); // Ruta del archivo actual (requerido en ES Modules)
const __dirname = path.dirname(__filename); // Directorio del archivo actual

// ===== Instancia de Express =====
const app = express(); // Instancia de Express
const PORT = 3000; // Puerto del servidor

// ===== Base de datos =====
initDB(); // Crea las tablas si no existen

// ===== Middleware =====
app.use(json()); // Parsea cuerpos JSON (para peticiones AJAX)
app.use(urlencoded({ extended: true })); // Parsea cuerpos de formularios HTML
app.use(methodOverride("_method")); // Lee ?_method=PUT/DELETE del query string

// ===== Motor de plantillas =====
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: path.join(__dirname, 'src/views/partials'),
    helpers: {
        getFullYear: () => new Date().getFullYear()
    }
}));
app.set("views", path.join(__dirname, "src/views")); // Directorio de vistas
app.set("view engine", "hbs"); // Establece Handlebars como motor de plantillas

// ===== Archivos estáticos =====
app.use(express.static(path.join(__dirname, "public"))); // Sirve CSS, JS e imágenes desde /public

// ===== Rutas =====
app.get("/", (req, res) => { // Redirige la raíz a la lista de topics
    res.redirect("/topics");
});
app.use(topicRoutes); // Monta las rutas de topics
app.use(linkRoutes); // Monta las rutas de enlaces

// ===== Manejo de errores =====
app.use((req, res) => { // Manejo de errores 404 - Ruta no encontrada
    res.status(404).render("error", { message: "Pagina no encontrada" });
});

app.use((err, req, res, next) => { // Manejo de errores 500 - Error interno del servidor
    console.error(err.stack);
    res.status(500).render("error", { message: "Error interno del servidor" });
});

// ===== Inicio del servidor =====
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});