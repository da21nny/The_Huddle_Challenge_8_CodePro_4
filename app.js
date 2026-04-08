import express, { json } from "express";
import methodOverride from "method-override";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", "./views");

const topics = [];

app.get("/", (req, res) => {
    res.render("index", { topics });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});