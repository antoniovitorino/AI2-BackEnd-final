/*
O código define um roteador utilizando o módulo express.Router().
O roteador é utilizado para agrupar as rotas relacionadas aos cargos.
O objeto cargosController é responsável por lidar com a lógica de negócio das rotas.
*/

const express = require('express');
const router = express.Router();
const cargosController = require('../controllers/cargosController');

// Rota para obter a lista de cargos
router.get('/', cargosController.cargo_list);

// Rota para criar um novo cargo
router.post('/create', cargosController.cargo_create);

// Rota para obter os detalhes de um cargo pelo ID
router.get('/:id', cargosController.cargo_detail);

// Rota para atualizar um cargo pelo ID
router.put('/update/:id', cargosController.cargo_update);

// Rota para excluir um cargo
router.delete('/delete/:id', cargosController.cargo_delete);

module.exports = router;