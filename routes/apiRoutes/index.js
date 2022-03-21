// index.js is the "crossroads" where the other routing files meet
const express = require('express');
const router = express.Router();
router.use(require('./voterRoutes'));

router.use(require('./candidateRoutes'));
router.use(require('./partyRoutes'));

module.exports = router;