const express = require('express');
const router = express.Router();

const midiaController = require('../controllers/midiaController')

router.get('/:id', midiaController.midia); 

module.exports = router;
