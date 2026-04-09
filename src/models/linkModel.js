import db from "../config/db.js";

const getLinksByTopic = (topicId) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM links WHERE topic_id = ?", [topicId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const createLink = (topicId, title, url) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO links (topic_id, title, url) VALUES (?, ?, ?)", [topicId, title, url], function (err) {
            if (err) reject(err);
            resolve({ id: this.lastID, topic_id: topicId, title, url, votes: 0 });
        });
    });
};

const voteLink = (id) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE links SET votes = votes + 1 WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

const deleteLink = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM links WHERE id = ?", [id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

const updateLink = (id, title, url) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE links SET title = ?, url = ? WHERE id = ?", [title, url, id], function (err) {
            if (err) reject(err);
            resolve(this.changes);
        });
    });
};

export { getLinksByTopic, createLink, voteLink, deleteLink, updateLink };