const topicModel = require('../models/topicModel');

exports.index = (req, res) => {
    const topics = topicModel.getAll();
    res.render('topics/index', { topics });
};

exports.show = (req, res) => {
    const topic = topicModel.getById(req.params.id);
    if (!topic) return res.status(404).render('404');
    res.render('topics/show', { topic });
};

exports.new = (req, res) => {
    res.render('topics/new');
};

exports.create = (req, res) => {
    const newTopic = topicModel.create(req.body);
    res.redirect(`/topics/${newTopic.id}`);
};

exports.edit = (req, res) => {
    const topic = topicModel.getById(req.params.id);
    if (!topic) return res.status(404).render('404');
    res.render('topics/edit', { topic });
};

exports.update = (req, res) => {
    topicModel.update(req.params.id, req.body);
    res.redirect(`/topics/${req.params.id}`);
};

exports.delete = (req, res) => {
    topicModel.delete(req.params.id);
    res.redirect('/topics');
};
