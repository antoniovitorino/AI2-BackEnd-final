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
  const { id } = req.body;
  
  const del = await Regra.destroy({ 
    where: { id: id }
  });
  
  res.json({ success: true, deleted: del, message: 'Regra apagada com sucesso' });
};

module.exports = controllers;