const express = require('express'); 
const router = express.Router(); 
const regrasController = require('../controllers/regrasController'); 

router.get('/', regrasController.regra_list); 
router.post('/create', regrasController.regra_create);
router.get('/:id',regrasController.regra_detail); 
router.put('/update/:id', regrasController.regra_update);
router.post('/delete', regrasController.regra_delete); 

module.exports = router; 