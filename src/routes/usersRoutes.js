const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const usersController = require('../controllers/usersController')

router.get('/list', middleware.checkToken, usersController.list);
router.get('/list/:id', middleware.checkToken, usersController.getUserById);
router.post('/register', middleware.checkToken, usersController.register); 
router.post('/login', usersController.login);
router.put('/update/:id', middleware.checkToken, usersController.update);
router.post('/delete', middleware.checkToken, usersController.delete);

module.exports = router;