
const express = require('express'); 
const router = express.Router(); 
const multer = require('multer'); 
const upload = multer({ dest: 'imagens' }); 
const equipaController = require('../controllers/equipasController'); 


router.get('/', equipaController.equipa_list); 

router.post('/create', upload.single('foto'), equipaController.equipa_create);

router.get('/:id',equipaController.equipa_detail); 

router.put('/update/:id', upload.single('foto'), equipaController.equipa_update);

router.post('/delete', equipaController.equipa_delete); 

module.exports = router; 


