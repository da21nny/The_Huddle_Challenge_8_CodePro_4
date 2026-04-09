import db from "../config/db.js";

const getAllTopics = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM topics ORDER BY votes DESC", [], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const createTopic = (title, description) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO topics (title, description) VALUES (?, ?)", [title, description], function (err) {
            if (err) reject(err);
            resolve({ id: this.lastID, title, description, votes: 0 });
        });
    });
};

const voteTopic = (id) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE topics SET votes = votes + 1 WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

const getTopicById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM topics WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

const deleteTopic = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM topics WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

const updateTopic = (id, title, description) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE topics SET title = ?, description = ? WHERE id = ?", [title, description, id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

export { getAllTopics, createTopic, voteTopic, getTopicById, deleteTopic, updateTopic };
