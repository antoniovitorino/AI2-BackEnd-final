const express = require('express'); 
const router = express.Router();
const cargosController = require('../controllers/cargosController'); 

router.get('/', cargosController.cargo_list); 
router.post('/create', cargosController.cargo_create); 
router.get('/:id',cargosController.cargo_detail); 
router.put('/update/:id', cargosController.cargo_update); 
router.post('/delete', cargosController.cargo_delete); 

module.exports = router; 