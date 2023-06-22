/*
O código define um roteador utilizando o módulo express.Router().
O roteador é utilizado para agrupar as rotas relacionadas às regras.
Cada rota é associada a um método específico do roteador (get, post, put) e a um controlador específico 
do regrasController. Os controladores são responsáveis por lidar com a lógica de negócio das rotas.
*/

const express = require('express');
const router = express.Router();
const regrasController = require('../controllers/regrasController');

// Rota para obter a lista de regras
router.get('/', regrasController.regra_list);

// Rota para criar uma nova regra
router.post('/create', regrasController.regra_create);

// Rota para obter os detalhes de uma regra pelo ID
router.get('/:id', regrasController.regra_detail);

// Rota para atualizar uma regra pelo ID
router.put('/update/:id', regrasController.regra_update);

// Rota para excluir uma regra
router.post('/delete', regrasController.regra_delete);

module.exports = router;