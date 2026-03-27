const topicModel = require('../models/topicModel');
const linkModel = require('../models/linkModel');

exports.new = (req, res) => {
    const topic = topicModel.getById(req.params.topicId);
    if (!topic) return res.status(404).render('404');
    res.render('links/new', { topic });
};

exports.create = (req, res) => {
    linkModel.create(req.params.topicId, req.body);
    res.redirect(`/topics/${req.params.topicId}`);
};

exports.edit = (req, res) => {
    const topic = topicModel.getById(req.params.topicId);
    const link = linkModel.getById(req.params.topicId, req.params.linkId);
    if (!topic || !link) return res.status(404).render('404');
    res.render('links/edit', { topic, link });
};

exports.update = (req, res) => {
    linkModel.update(req.params.topicId, req.params.linkId, req.body);
    res.redirect(`/topics/${req.params.topicId}`);
};

exports.delete = (req, res) => {
    linkModel.delete(req.params.topicId, req.params.linkId);
    res.redirect(`/topics/${req.params.topicId}`);
};
