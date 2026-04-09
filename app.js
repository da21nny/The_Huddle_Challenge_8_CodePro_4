import express, { json, urlencoded } from "express";
import methodOverride from "method-override";
import { initDB } from "./src/config/db.js";
import topicRoutes from "./src/routes/topicRoutes.js";
import linkRoutes from "./src/routes/linkRoutes.js";

const app = express();
const PORT = 3000;

// Initialize Database
initDB();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

// Routes
app.use(topicRoutes);
app.use(linkRoutes);

app.get("/", (req, res) => {
    res.redirect("/topics");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});