import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Obtiene la ruta del archivo y directorio actual (requerido en ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo de la base de datos SQLite
const dbFile = path.join(__dirname, "learning_platform.db");

// Crea la conexión a la base de datos
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error("Error al abrir/crear la base de datos:", err.message);
        return;
    }
    console.log("Conectado a la base de datos");
});

// Habilita el soporte de claves foráneas (SQLite las ignora por defecto)
db.run("PRAGMA foreign_keys = ON");

// Crea las tablas si no existen, en orden secuencial por dependencia FK
const initDB = () => {
    db.serialize(() => {
        // Tabla de temas/tópicos de aprendizaje
        db.run(
            `CREATE TABLE IF NOT EXISTS topics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                votes INTEGER DEFAULT 0
            )`,
            (err) => {
                if (err) console.error("Error al crear tabla topics:", err.message); // Muestra error en consola
            }
        );

        // Tabla de enlaces asociados a un tópico (depende de topics)
        db.run(
            `CREATE TABLE IF NOT EXISTS links (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                topic_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                url TEXT NOT NULL,
                votes INTEGER DEFAULT 0,
                FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
            )`,
            (err) => {
                if (err) console.error("Error al crear tabla links:", err.message); // Muestra error en consola
            }
        );
    });
};

// Exporta la conexión como default y la función de inicialización como named export
export default db;
export { initDB };