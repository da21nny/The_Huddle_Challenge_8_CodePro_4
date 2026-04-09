import express, { json, urlencoded } from "express";
import methodOverride from "method-override";
import { initDB } from "./src/config/db.js";
import topicRoutes from "./src/routes/topicRoutes.js";
import linkRoutes from "./src/routes/linkRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Initialize Database
initDB();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src/views")));
app.use(express.static(path.join(__dirname, "src/views/topics")));
app.use(express.static(path.join(__dirname, "src/views/links")));
app.use(express.static(path.join(__dirname, "src/controllers")));
app.use(express.static(path.join(__dirname, "src/routes")));
app.use(express.static(path.join(__dirname, "src/models")));
app.use(express.static(path.join(__dirname, "src/config")));

// Routes
app.use(topicRoutes);
app.use(linkRoutes);

app.get("/", (req, res) => {
    res.redirect("/topics");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});