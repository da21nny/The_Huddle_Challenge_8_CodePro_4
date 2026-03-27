const express = require('express');
const router = express.Router();
const topicRoutes = require('./topicRoutes');
const voteRoutes = require('./voteRoutes');

router.get('/', (req, res) => {
    res.redirect('/topics');
});

router.use('/topics', topicRoutes);
router.use('/vote', voteRoutes);

module.exports = router;
