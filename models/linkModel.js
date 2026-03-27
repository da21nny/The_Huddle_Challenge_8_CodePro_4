const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '../data/db.json');

function readData() {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
    getById: (topicId, linkId) => {
        const data = readData();
        const topic = data.topics.find(t => t.id === topicId);
        if (!topic) return null;
        return topic.links.find(l => l.id === linkId);
    },
    create: (topicId, linkData) => {
        const data = readData();
        const topic = data.topics.find(t => t.id === topicId);
        if (!topic) return null;
        const newLink = {
            id: uuidv4(),
            url: linkData.url,
            description: linkData.description,
            votes: 0,
            createdAt: new Date().toISOString()
        };
        topic.links.push(newLink);
        writeData(data);
        return newLink;
    },
    update: (topicId, linkId, linkData) => {
        const data = readData();
        const topic = data.topics.find(t => t.id === topicId);
        if (!topic) return null;
        const linkIndex = topic.links.findIndex(l => l.id === linkId);
        if (linkIndex === -1) return null;
        topic.links[linkIndex].url = linkData.url;
        topic.links[linkIndex].description = linkData.description;
        writeData(data);
        return topic.links[linkIndex];
    },
    delete: (topicId, linkId) => {
        const data = readData();
        const topic = data.topics.find(t => t.id === topicId);
        if (!topic) return;
        topic.links = topic.links.filter(l => l.id !== linkId);
        writeData(data);
    },
    vote: (topicId, linkId) => {
        const data = readData();
        const topic = data.topics.find(t => t.id === topicId);
        if (!topic) return null;
        const link = topic.links.find(l => l.id === linkId);
        if (!link) return null;
        link.votes += 1;
        topic.links.sort((a, b) => b.votes - a.votes);
        writeData(data);
        return { votes: link.votes, linksOrder: topic.links.map(l => l.id) };
    }
};
