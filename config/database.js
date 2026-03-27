// Maneja la lectura y escritura del archivo JSON (base de datos en disco)
const fs = require('fs');
const path = require('path');

// Ruta absoluta al archivo de datos
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

// Estructura inicial si el archivo no existe
const DEFAULT_DATA = { topics: [] };

// Lee y parsea el archivo JSON
function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    writeDB(DEFAULT_DATA); // crea el archivo si no existe
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

// Serializa y escribe los datos al archivo JSON
function writeDB(data) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); // crea la carpeta si no existe
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readDB, writeDB };
