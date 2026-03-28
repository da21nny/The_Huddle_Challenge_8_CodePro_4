const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/mainController');

router.get('/', ctrl.home);

// Topics
router.get('/topics', ctrl.listTopics);
router.get('/topics/new', ctrl.newTopic);
router.post('/topics', ctrl.createTopic);
router.get('/topics/:id', ctrl.showTopic);
router.get('/topics/:id/edit', ctrl.editTopic);
router.put('/topics/:id', ctrl.updateTopic);
router.delete('/topics/:id', ctrl.deleteTopic);
router.post('/topics/:id/vote', ctrl.voteTopic);

// Links
router.get('/topics/:topicId/links/new', ctrl.newLink);
router.post('/topics/:topicId/links', ctrl.createLink);
router.get('/topics/:topicId/links/:linkId/edit', ctrl.editLink);
router.put('/topics/:topicId/links/:linkId', ctrl.updateLink);
router.delete('/topics/:topicId/links/:linkId', ctrl.deleteLink);
router.post('/topics/:topicId/links/:linkId/vote', ctrl.voteLink);

module.exports = router;