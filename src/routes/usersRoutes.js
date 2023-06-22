/*
O código define um roteador utilizando o módulo express.Router().
O roteador é utilizado para agrupar as rotas relacionadas aos administradores.
O middleware middleware.checkToken é utilizado para verificar o token de autenticação antes de prosseguir com as rotas 
que requerem autenticação.
As rotas são definidas utilizando os métodos correspondentes (get, post, put) do roteador.
Cada rota é associada a um controlador específico do administrador através do usersController. 
Os controladores são responsáveis por lidar com a lógica de negócio das rotas.
*/

const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const usersController = require('../controllers/usersController');

// Rota para obter a lista de administradores
router.get('/list', middleware.checkToken, usersController.list);

// Rota para obter um administrador pelo ID
router.get('/list/:id', middleware.checkToken, usersController.getUserById);

// Rota para registrar um novo administrador
router.post('/register', middleware.checkToken, usersController.register);

// Rota para fazer login
router.post('/login', usersController.login);

// Rota para atualizar informações de um administrador pelo ID
router.put('/update/:id', middleware.checkToken, usersController.update);

// Rota para excluir um administrador
router.delete('/delete/:id', middleware.checkToken, usersController.delete);

module.exports = router;