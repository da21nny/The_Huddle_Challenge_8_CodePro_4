const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const linkController = require('../controllers/linkController');

// Rutas de Topics
router.get('/', topicController.index);
router.get('/new', topicController.new);
router.post('/', topicController.create);
router.get('/:id', topicController.show);
router.get('/:id/edit', topicController.edit);
router.put('/:id', topicController.update);
router.delete('/:id', topicController.delete);

// Rutas de Links
router.get('/:topicId/links/new', linkController.new);
router.post('/:topicId/links', linkController.create);
router.get('/:topicId/links/:linkId/edit', linkController.edit);
router.put('/:topicId/links/:linkId', linkController.update);
router.delete('/:topicId/links/:linkId', linkController.delete);

module.exports = router;
