
const express = require('express'); 
const router = express.Router(); 
const multer = require('multer'); 
const upload = multer({ dest: 'imagens' }); 
const carouselsController = require('../controllers/carouselsController'); 

router.get('/', carouselsController.carousels_list); 

router.post('/create', upload.single('foto'), carouselsController.carousels_create);

router.get('/:id',carouselsController.carousels_detail); 

router.put('/update/:id', upload.single('foto'), carouselsController.carousels_update);

router.post('/delete', carouselsController.carousels_delete); 

module.exports = router; 