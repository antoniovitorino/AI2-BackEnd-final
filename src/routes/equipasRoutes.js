/*
O código define um roteador utilizando o módulo express.Router().
O roteador é utilizado para agrupar as rotas relacionadas às equipas.
O módulo multer é importado para lidar com o upload de ficheiros, como imagens.
A configuração do multer é definida com upload.single('foto'), onde 'foto' é o nome do campo do 
formulário que contém a foto a ser enviada.
A rota /create utiliza o método post para criar uma nova equipa, e o middleware upload.single('foto') 
é utilizado para processar o upload da foto.
A rota /update/:id utiliza o método put para atualizar uma equipa existente, e também utiliza o middleware 
upload.single('foto') para processar o upload da nova foto.
*/

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'imagens' });
const equipaController = require('../controllers/equipasController');

// Rota para obter a lista de equipas
router.get('/', equipaController.equipa_list);

// Rota para criar uma nova equipa com upload de uma foto
router.post('/create', upload.single('foto'), equipaController.equipa_create);

// Rota para obter os detalhes de uma equipa pelo ID
router.get('/:id', equipaController.equipa_detail);

// Rota para atualizar uma equipa pelo ID com upload de uma foto
router.put('/update/:id', upload.single('foto'), equipaController.equipa_update);

// Rota para excluir uma equipa
router.post('/delete', equipaController.equipa_delete);

module.exports = router;
