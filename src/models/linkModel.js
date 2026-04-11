import db from "../config/db.js";

const getLinksByTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM links WHERE topic_id = ? ORDER BY votes DESC", [topicId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

const getLinkById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM links WHERE id = ?", [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
};

const createLink = (topicId, title, url) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO links (topic_id, title, url) VALUES (?, ?, ?)", [topicId, title, url], function (err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, topic_id: topicId, title, url, votes: 0 });
        });
    });
};

const voteLink = (id) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE links SET votes = votes + 1 WHERE id = ?", [id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

const deleteLink = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM links WHERE id = ?", [id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

const updateLink = (id, title, url) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE links SET title = ?, url = ? WHERE id = ?", [title, url, id], function (err) {
            if (err) return reject(err);
            resolve(this.changes);
        });
    });
};

export { getLinksByTopic, getLinkById, createLink, voteLink, deleteLink, updateLink };