
const express = require('express'); 
const router = express.Router(); 
const paginasController = require('../controllers/paginasController'); 


router.get('/', paginasController.pagina_list); 

router.post('/create', paginasController.pagina_create);

router.get('/:id',paginasController.pagina_detail); 

router.put('/update/:id', paginasController.pagina_update);

router.post('/delete', paginasController.pagina_delete); 


module.exports = router; 


