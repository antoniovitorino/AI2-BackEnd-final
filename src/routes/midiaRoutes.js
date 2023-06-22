/*
O código define um roteador utilizando o módulo express.Router().
O roteador é utilizado para agrupar as rotas relacionadas às imagens.
A rota definida por (App.js: /midia) /:id, o que significa que esta rota espera um parâmetro id.
O controlador midiaController é responsável por lidar com a lógica de negócio da rota.
Esta rota é utilizada para obter uma "imagem" com base no ID fornecido.
*/

const express = require('express');
const router = express.Router();

const midiaController = require('../controllers/midiaController')

// Rota para obter uma imagem pelo ID
router.get('/:id', midiaController.midia); 

module.exports = router;