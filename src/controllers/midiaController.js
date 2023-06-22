/*
O código importa o modelo Midia do arquivo midia.js e o objeto sequelize do arquivo database.js.
O objeto controllers vazio é criado para armazenar todas as funções relacionadas ao controlador.
A função sequelize.sync() é chamada para sincronizar os modelos com a Base de Dados.
A função controllers.midia é responsável por recuperar e enviar um arquivo de mídia com base no ID 
fornecido nos parâmetros da requisição. Utiliza o método Midia.findByPk() para buscar a mídia pelo 
seu ID na Base de Dados. Se a mídia não for encontrada, a função responde com o status 404. Caso 
contrário, define o cabeçalho Content-Type com o tipo de mídia correspondente e envia o conteúdo 
binário da mídia como resposta.
O objeto controllers é exportado para que possa ser utilizado noutros lugares.
*/

var Midia = require('../models/midia');
var sequelize = require('../models/database');

const controllers = {};
sequelize.sync();

controllers.midia = async (req, res) => {
    const midia = await Midia.findByPk(req.params.id);
    if (!midia) {
      res.sendStatus(404);
      return;
    }
    res.set('Content-Type', midia.mimetype);
    res.send(midia.binario);
  };

  module.exports = controllers;