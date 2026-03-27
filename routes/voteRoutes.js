const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.post('/topic/:id', voteController.voteTopic);
router.post('/topic/:id/link/:lid', voteController.voteLink);

module.exports = router;
