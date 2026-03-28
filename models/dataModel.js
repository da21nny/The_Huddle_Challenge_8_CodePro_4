const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../data/db.json');

function getDb() { return JSON.parse(fs.readFileSync(dbPath, 'utf8')); }
function saveDb(data) { fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); }

module.exports = {
    getTopics: () => getDb().topics.sort((a, b) => b.votes - a.votes),
    
    getTopic: (id) => {
        let topic = getDb().topics.find(t => t.id === id);
        if (topic) topic.links.sort((a, b) => b.votes - a.votes);
        return topic;
    },
    
    addTopic: (title, description) => {
        let db = getDb();
        let topic = { id: uuidv4(), title, description, votes: 0, links: [] };
        db.topics.push(topic);
        saveDb(db);
        return topic;
    },
    
    updateTopic: (id, title, description) => {
        let db = getDb();
        let topic = db.topics.find(t => t.id === id);
        if (topic) {
            topic.title = title;
            topic.description = description;
            saveDb(db);
        }
    },
    
    deleteTopic: (id) => {
        let db = getDb();
        db.topics = db.topics.filter(t => t.id !== id);
        saveDb(db);
    },
    
    voteTopic: (id) => {
        let db = getDb();
        let topic = db.topics.find(t => t.id === id);
        if (topic) {
            topic.votes++;
            saveDb(db);
            return topic.votes;
        }
        return 0;
    },

    getLink: (topicId, linkId) => {
        let topic = getDb().topics.find(t => t.id === topicId);
        return topic ? topic.links.find(l => l.id === linkId) : null;
    },

    addLink: (topicId, url, description) => {
        let db = getDb();
        let topic = db.topics.find(t => t.id === topicId);
        if (topic) {
            topic.links.push({ id: uuidv4(), url, description, votes: 0 });
            saveDb(db);
        }
    },

    updateLink: (topicId, linkId, url, description) => {
        let db = getDb();
        let topic = db.topics.find(t => t.id === topicId);
        if (topic) {
            let link = topic.links.find(l => l.id === linkId);
            if (link) {
                link.url = url;
                link.description = description;
                saveDb(db);
            }
        }
    },

    deleteLink: (topicId, linkId) => {
        let db = getDb();
        let topic = db.topics.find(t => t.id === topicId);
        if (topic) {
            topic.links = topic.links.filter(l => l.id !== linkId);
            saveDb(db);
        }
    },

    voteLink: (topicId, linkId) => {
        let db = getDb();
        let topic = db.topics.find(t => t.id === topicId);
        if (topic) {
            let link = topic.links.find(l => l.id === linkId);
            if (link) {
                link.votes++;
                saveDb(db);
                return link.votes;
            }
        }
        return 0;
    }
};