// ===== Imports =====
import path from "path";
import { fileURLToPath } from "url";
import express, { json, urlencoded } from "express";
import methodOverride from "method-override";
import { initDB } from "./src/config/db.js";
import topicRoutes from "./src/routes/topicRoutes.js";
import linkRoutes from "./src/routes/linkRoutes.js";

// ===== Configuración de rutas del sistema =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Instancia de Express =====
const app = express();
const PORT = 3000;

// ===== Base de datos =====
initDB();

// ===== Middleware =====
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ===== Motor de plantillas =====
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// ===== Archivos estáticos =====
app.use(express.static(path.join(__dirname, "public")));

// ===== Rutas =====
app.get("/", (req, res) => {
    res.redirect("/topics");
});

app.use(topicRoutes);
app.use(linkRoutes);

// ===== Manejo de errores =====
app.use((req, res) => { // Manejo de errores 404
    res.status(404).render("error", { message: "Pagina no encontrada" });
});

app.use((err, req, res, next) => { // Manejo de errores 500
    console.error(err.stack);
    res.status(500).render("error", { message: "Error interno del servidor" });
});

// ===== Inicio del servidor =====
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
