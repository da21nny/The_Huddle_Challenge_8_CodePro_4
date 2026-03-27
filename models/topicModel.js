const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../data/db.json');

function readData() {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
    getAll: () => {
        const data = readData();
        return data.topics.sort((a, b) => b.votes - a.votes);
    },
    getById: (id) => {
        const data = readData();
        const topic = data.topics.find(t => t.id === id);
        if (topic && topic.links) {
            topic.links.sort((a, b) => b.votes - a.votes);
        }
        return topic;
    },
    create: (topicData) => {
        const data = readData();
        const newTopic = {
            id: uuidv4(),
            title: topicData.title,
            description: topicData.description,
            votes: 0,
            createdAt: new Date().toISOString(),
            links: []
        };
        data.topics.push(newTopic);
        writeData(data);
        return newTopic;
    },
    update: (id, topicData) => {
        const data = readData();
        const index = data.topics.findIndex(t => t.id === id);
        if (index === -1) return null;
        data.topics[index].title = topicData.title;
        data.topics[index].description = topicData.description;
        writeData(data);
        return data.topics[index];
    },
    delete: (id) => {
        const data = readData();
        data.topics = data.topics.filter(t => t.id !== id);
        writeData(data);
    },
    vote: (id) => {
        const data = readData();
        const topic = data.topics.find(t => t.id === id);
        if (!topic) return null;
        topic.votes += 1;
        data.topics.sort((a, b) => b.votes - a.votes); // Reordenar
        writeData(data);
        return { votes: topic.votes, topicsOrder: data.topics.map(t => t.id) };
    }
};
