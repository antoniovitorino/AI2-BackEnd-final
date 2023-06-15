const multer = require('multer');
const path = require('path');

const upload = multer({ dest: 'imagens' });
const fs = require('fs');

var Equipa = require('../models/equipas'); 
var Cargo = require('../models/cargos');
var Midia = require('../models/midia');
var sequelize = require('../models/database');

const controllers = {};

sequelize.sync();

controllers.equipa_list = async (req, res) => {
  try {
    const data = await Equipa.findAll({ 
      include: [ Cargo ],
      order: [
        ['id', 'DESC'],
      ],
    });

    res.json({ success: true, data: data });
  } catch (error) {
    console.log('Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar membros da equipa' });
  }
};

controllers.equipa_create = async (req, res) => {
  try {
      const { nome, numero_aluno, biografia, cargo } = req.body;
      const foto = req.file;

      if (!foto) {
          return res.json({ success: false, message: 'Nenhuma imagem enviada' }); 
      }

      // Crie um novo registro na tabela Midia
      const midia = await Midia.create({
          binario: fs.readFileSync(foto.path),
          mimetype: foto.mimetype
      });
      
      fs.unlinkSync(foto.path);  // Remover o arquivo da imagem após salvar os dados na base de dados

      const data = await Equipa.create({
          nome: nome,
          numero_aluno: numero_aluno,
          biografia: biografia,
          fotoId: midia.id,   // Use o id da midia criada
          cargoId: cargo
      });

      res.json({ success: true, message: 'Membro da equipa criado com sucesso', data: data });
  } catch (error) {
      console.log('Erro:', error);
      res.status(500).json({ success: false, message: 'Erro ao criar membro da equipa' });
  }
};


controllers.equipa_detail = async (req, res) => {
  const { id } = req.params;
  
  const data = await Equipa.findAll({
    where: { id: id },
    include: [ Cargo ]
  })
  .then(function(data) {
    return data;
  })
  .catch(error => {
    return error;
  });
  
  res.json({ success: true, data: data });
};

controllers.equipa_update = async (req, res) => {
  const { id } = req.params;
  const { nome, numero_aluno, biografia, cargo } = req.body;
  const foto = req.file;

  try {
      const equipa = await Equipa.findByPk(id);
    
      if (!equipa) {
          return res.json({ success: false, message: 'Membro da equipa não encontrado' }); 
      }
    
      if (foto) {
          // Crie um novo registro na tabela Midia
          const midia = await Midia.create({
              binario: fs.readFileSync(foto.path),
              mimetype: foto.mimetype
          });
          
          fs.unlinkSync(foto.path);  // Remover o arquivo da imagem após salvar os dados na base de dados
          
          equipa.fotoId = midia.id;   // Use o id da midia criada
      }
      
      equipa.nome = nome;
      equipa.numero_aluno = numero_aluno;
      equipa.biografia = biografia;
      equipa.cargoId = cargo;
      
      await equipa.save();
      
      res.json({ success: true, message: 'Membro da equipa atualizado com sucesso', data: equipa });
  } catch (error) {
      console.log('Erro:', error);
      res.status(500).json({ success: false, message: 'Erro ao atualizar o membro da equipa' });
  }
};

controllers.equipa_delete = async (req, res) => {
  const { id } = req.body;
  
  const del = await Equipa.destroy({ 
    where: { id: id }
  });
  
  res.json({ success: true, deleted: del, message: 'Membro da equipa apagado com sucesso' });
};

module.exports = controllers;
