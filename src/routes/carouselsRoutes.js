/*
O código define um roteador utilizando o módulo express.Router().
O roteador é utilizado para agrupar as rotas relacionadas aos slides.
O módulo multer é importado para lidar com o upload de ficheiros, como imagens.
A configuração do multer é definida com upload.single('foto'), onde 'foto' é o nome do campo do 
formulário que contém a foto a ser enviada.
A rota /create utiliza o método post para criar um novo slide, e o middleware upload.single('foto') 
é utilizado para processar o upload da foto.
A rota /update/:id utiliza o método put para atualizar um slide existente, e também utiliza o 
middleware upload.single('foto') para processar o upload da nova foto.
O objeto carouselsController é responsável por lidar com a lógica de negócio das rotas.
*/

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'imagens' });
const carouselsController = require('../controllers/carouselsController');

// Rota para obter a lista de slides
router.get('/', carouselsController.carousels_list);

// Rota para criar um novo slide com upload de uma foto
router.post('/create', upload.single('foto'), carouselsController.carousels_create);

// Rota para obter os detalhes de um slide pelo ID
router.get('/:id', carouselsController.carousels_detail);

// Rota para atualizar um slide pelo ID com upload de uma foto
router.put('/update/:id', upload.single('foto'), carouselsController.carousels_update);

// Rota para excluir um slide
router.delete('/delete/:id', carouselsController.carousels_delete);

module.exports = router;