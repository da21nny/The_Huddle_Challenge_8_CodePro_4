import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = path.join(__dirname, "../../data/learning_platform.db");
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.log("Error al abrir/crear la base de datos", err.message);
        return;
    }
    console.log("Conectado a la base de datos");
});

const initDB = () => {
    db.run(`CREATE TABLE IF NOT EXISTS topics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        votes INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topic_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        votes INTEGER DEFAULT 0,
        FOREIGN KEY (topic_id) REFERENCES topics(id)
    )`);
};

export default db;
export { initDB };