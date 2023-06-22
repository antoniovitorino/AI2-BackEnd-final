/*
O código importa o modelo Cargo e a instância sequelize da Base de Dados.
Em seguida, cria o objeto controllers.
A função cargo_list busca todos os cargos na tabela Cargo e retorna os dados.
A função cargo_create é responsável por criar um novo cargo. Recebe o nome do cargo e cria 
um novo registro na tabela Cargo.
A função cargo_detail busca os detalhes de um cargo específico com base no ID fornecido.
A função cargo_update é responsável por atualizar o nome de um cargo existente. Recebe o ID 
do cargo e o novo nome do cargo.
A função cargo_delete exclui um cargo existente com base no ID fornecido.
O objeto controllers é exportado para ser usado noutros ficheiros.
*/

var Cargo = require('../models/cargos');
var sequelize = require('../models/database');

const controllers = {};

sequelize.sync();

controllers.cargo_list = async (req, res) => {
  const data = await Cargo.findAll({ 
    
  }) 
  .then(function(data) {
    return data;
  })
  .catch(error => {
    return error;
  });
  
  res.json({ success: true, data: data }); 
};


controllers.cargo_create = async (req, res) => {
    try {
      const {cargo} = req.body;
  
      const data = await Cargo.create({
        cargo: cargo,
      });
  
      res.json({ success: true, message: 'Cargo criado com sucesso', data: data });
    } catch (error) {
      console.log('Erro:', error);
      res.status(500).json({ success: false, message: 'Erro ao criar cargo' });
    }
  };


controllers.cargo_detail = async (req, res) => {
  const { id } = req.params;
  
  const data = await Cargo.findAll({
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

controllers.cargo_update = async (req, res) => {
  const { id } = req.params;
  const { cargo: novoCargo } = req.body;

  try {
    const cargo = await Cargo.findByPk(id);

    if (!cargo) {
      return res.json({ success: false, message: 'Cargo não encontrado' });
    }

    cargo.cargo = novoCargo;

    await cargo.save();

    res.json({ success: true, message: 'Cargo atualizado com sucesso', data: cargo });
  } catch (error) {
    console.log('Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar o cargo' });
  }
};

controllers.cargo_delete = async (req, res) => {
  const { id } = req.body;
  
  const del = await Cargo.destroy({ 
    where: { id: id }
  });
  
  res.json({ success: true, deleted: del, message: 'Cargo apagado com sucesso' });
};

module.exports = controllers;