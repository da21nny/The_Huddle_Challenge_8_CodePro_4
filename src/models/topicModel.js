import db from "../config/db.js";

// Obtiene todos los topics, ordenados por votos de mayor a menor
const getAllTopics = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM topics ORDER BY votes DESC", [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

// Crea un nuevo topic y retorna el objeto creado con su ID
const createTopic = (title, description) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO topics (title, description) VALUES (?, ?)", [title, description], function (err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, title, description, votes: 0 });
        });
    });
};

// Incrementa en 1 el conteo de votos de un topic
const voteTopic = (id) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE topics SET votes = votes + 1 WHERE id = ?", [id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

// Obtiene un topic por su ID
const getTopicById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM topics WHERE id = ?", [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
};

// Elimina un topic por su ID (los links asociados se eliminan por ON DELETE CASCADE)
const deleteTopic = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM topics WHERE id = ?", [id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

// Actualiza el título y descripción de un topic existente
const updateTopic = (id, title, description) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE topics SET title = ?, description = ? WHERE id = ?", [title, description, id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

export { getAllTopics, createTopic, voteTopic, getTopicById, deleteTopic, updateTopic }; // Exporta las funciones