const express = require('express');
const router = express.Router();

const memoryGameController = require('../app/controllers/MemoryGameController');

router.use('/', memoryGameController.index);

module.exports = router;
