const db = require('../models/dataModel');

module.exports = {
    // Topic routes
    home: (req, res) => res.redirect('/topics'),
    
    listTopics: (req, res) => {
        let topics = db.getTopics();
        res.render('topics/index', { topics });
    },
    
    newTopic: (req, res) => res.render('topics/new'),
    
    createTopic: (req, res) => {
        let topic = db.addTopic(req.body.title, req.body.description);
        res.redirect('/topics/' + topic.id);
    },
    
    showTopic: (req, res) => {
        let topic = db.getTopic(req.params.id);
        if (!topic) return res.render('404');
        res.render('topics/show', { topic });
    },
    
    editTopic: (req, res) => {
        let topic = db.getTopic(req.params.id);
        if (!topic) return res.render('404');
        res.render('topics/edit', { topic });
    },
    
    updateTopic: (req, res) => {
        db.updateTopic(req.params.id, req.body.title, req.body.description);
        res.redirect('/topics/' + req.params.id);
    },
    
    deleteTopic: (req, res) => {
        db.deleteTopic(req.params.id);
        res.redirect('/topics');
    },
    
    voteTopic: (req, res) => {
        let votes = db.voteTopic(req.params.id);
        res.json({ votes });
    },

    // Link routes
    newLink: (req, res) => {
        let topic = db.getTopic(req.params.topicId);
        if (!topic) return res.render('404');
        res.render('links/new', { topic });
    },
    
    createLink: (req, res) => {
        db.addLink(req.params.topicId, req.body.url, req.body.description);
        res.redirect('/topics/' + req.params.topicId);
    },
    
    editLink: (req, res) => {
        let topic = db.getTopic(req.params.topicId);
        let link = db.getLink(req.params.topicId, req.params.linkId);
        if (!topic || !link) return res.render('404');
        res.render('links/edit', { topic, link });
    },
    
    updateLink: (req, res) => {
        db.updateLink(req.params.topicId, req.params.linkId, req.body.url, req.body.description);
        res.redirect('/topics/' + req.params.topicId);
    },
    
    deleteLink: (req, res) => {
        db.deleteLink(req.params.topicId, req.params.linkId);
        res.redirect('/topics/' + req.params.topicId);
    },
    
    voteLink: (req, res) => {
        let votes = db.voteLink(req.params.topicId, req.params.linkId);
        res.json({ votes });
    }
};