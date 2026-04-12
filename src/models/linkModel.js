import db from "../config/db.js";

// Obtiene todos los enlaces de un topic, ordenados por votos de mayor a menor
const getLinksByTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM links WHERE topic_id = ? ORDER BY votes DESC", [topicId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

// Obtiene un enlace por su ID
const getLinkById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM links WHERE id = ?", [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
};

// Crea un nuevo enlace asociado a un topic y retorna el objeto creado
const createLink = (topicId, title, url) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO links (topic_id, title, url) VALUES (?, ?, ?)", [topicId, title, url], function (err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, topic_id: topicId, title, url, votes: 0 });
        });
    });
};

// Incrementa en 1 el conteo de votos de un enlace
const voteLink = (id) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE links SET votes = votes + 1 WHERE id = ?", [id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

// Elimina un enlace por su ID y retorna la cantidad de filas afectadas
const deleteLink = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM links WHERE id = ?", [id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

// Actualiza el título y URL de un enlace existente
const updateLink = (id, title, url) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE links SET title = ?, url = ? WHERE id = ?", [title, url, id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

export { getLinksByTopic, getLinkById, createLink, voteLink, deleteLink, updateLink };
