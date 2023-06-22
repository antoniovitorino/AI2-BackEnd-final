/*
O código define um roteador utilizando o módulo express.Router().
O roteador é utilizado para agrupar as rotas relacionadas às páginas.
Cada rota é associada a um método específico do roteador (get, post, put) e a um 
controlador específico do paginasController. Os controladores são responsáveis por lidar com a lógica de negócio das rotas.
*/

const express = require('express');
const router = express.Router();
const paginasController = require('../controllers/paginasController');

// Rota para obter a lista de páginas
router.get('/', paginasController.pagina_list);

// Rota para criar uma nova página
router.post('/create', paginasController.pagina_create);

// Rota para obter os detalhes de uma página pelo ID
router.get('/:id', paginasController.pagina_detail);

// Rota para atualizar uma página pelo ID
router.put('/update/:id', paginasController.pagina_update);

// Rota para excluir uma página
router.post('/delete', paginasController.pagina_delete);

module.exports = router;