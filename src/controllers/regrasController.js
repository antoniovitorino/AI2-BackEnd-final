/*
O código importa o modelo Regra do ficheiro regras.js e o objeto sequelize do ficheiro database.js.
O objeto controllers vazio é criado para armazenar todas as funções relacionadas ao controlador.
A função sequelize.sync() é chamada para sincronizar os modelos com a Base de Dados.
A função controllers.regra_list é uma função assíncrona que recupera todas as regras da Base de Dados 
usando o método Regra.findAll() e retorna os dados em formato JSON.
A função controllers.regra_create é uma função assíncrona que lida com a criação de uma nova regra. Recebe 
os dados da regra (regra e descrição) por meio do corpo da requisição, cria uma nova instância do modelo 
Regra com estes dados e retorna os dados da regra criada em formato JSON.
A função controllers.regra_detail é uma função assíncrona que recupera os detalhes de uma regra específica 
com base no ID fornecido. Utiliza o método Regra.findAll() com uma cláusula where para buscar a regra 
correspondente na Base de Dados e retorna os dados em formato JSON.
A função controllers.regra_update é uma função assíncrona que lida com a atualização dos dados duma regra. Recebe 
o ID da regra a ser atualizada e os novos dados (regra e descrição) no corpo da requisição. Em seguida, utiliza o 
método Regra.findByPk() para buscar a regra pelo seu ID, atualiza os dados e salva a instância atualizada na Base 
de Dados. Por fim, retorna os dados da regra atualizada em formato JSON.
A função controllers.regra_delete é uma função assíncrona que lida com a exclusão de uma regra. Recebe o ID da 
regra a ser excluída no corpo da requisição, utiliza o método Regra.destroy() para remover a regra da Base de 
Dados e retorna uma mensagem de sucesso em formato JSON.
O objeto controllers é exportado para que possa ser utilizado em outros lugares.
*/

var Regra = require('../models/regras');
var sequelize = require('../models/database');

const controllers = {};

sequelize.sync();

controllers.regra_list = async (req, res) => {
  const data = await Regra.findAll({ 
    
  }) 
  .then(function(data) {
    return data;
  })
  .catch(error => {
    return error;
  });
  
  res.json({ success: true, data: data }); 
};


controllers.regra_create = async (req, res) => {
    try {
      const {regra, descricao} = req.body;
  
      const data = await Regra.create({
        regra: regra,
        descricao: descricao,
      });
  
      res.json({ success: true, message: 'Regra criada com sucesso', data: data });
    } catch (error) {
      console.log('Erro:', error);
      res.status(500).json({ success: false, message: 'Erro ao criar regra' });
    }
  };


controllers.regra_detail = async (req, res) => {
  const { id } = req.params;
  
  const data = await Regra.findAll({
    where: { id: id }
  })
  .then(function(data) {
    return data;
  })
  .catch(error => {
    return error;
  });
  
  res.json({ success: true, data: data });
};

controllers.regra_update = async (req, res) => {
  const { id } = req.params;
  const { regra: novoRegra, descricao: novaDescricao } = req.body;

  try {
    const regra = await Regra.findByPk(id);

    if (!regra) {
      return res.json({ success: false, message: 'Regra não encontrada' });
    }

    regra.regra = novoRegra;
    regra.descricao = novaDescricao;  

    await regra.save();

    res.json({ success: true, message: 'Regra atualizada com sucesso', data: regra });
  } catch (error) {
    console.log('Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar a regra' });
  }
};

controllers.regra_delete = async (req, res) => {
  const { id } = req.params;

  const del = await Regra.destroy({
    where: { id: id }
  });

  res.json({ success: true, deleted: del, message: 'Regra apagada com sucesso' });
};


module.exports = controllers;