const multer = require('multer');
const path = require('path');

const upload = multer({ dest: 'imagens' });
const fs = require('fs');

var Carousels = require('../models/carousels'); 
var Midia = require('../models/midia');
var sequelize = require('../models/database');

const controllers = {};

sequelize.sync();

controllers.carousels_list = async (req, res) => {
  try {
    const data = await Carousels.findAll({ 
      order: [
        ['id', 'ASC'],
      ],
    });
    res.json({ success: true, data: data });
  } catch (error) {
    console.log('Erro:', error);
    res.status(500).json({ success: false, message: 'Erro' });
  }
};

controllers.carousels_create = async (req, res) => {
  try {
      const { titulo, descricao } = req.body;
      const foto = req.file;

      if (!foto) {
          return res.json({ success: false, message: 'Nenhuma imagem enviada' }); 
      }

      const midia = await Midia.create({
          binario: fs.readFileSync(foto.path),
          mimetype: foto.mimetype
      });
      
      fs.unlinkSync(foto.path);  

      const data = await Carousels.create({
          titulo: titulo,
          descricao: descricao,
          fotoId: midia.id,   
      });

      res.json({ success: true, message: 'Slide criado com sucesso', data: data });
  } catch (error) {
      console.log('Erro:', error);
      res.status(500).json({ success: false, message: 'Erro ao criar slide' });
  }
};


controllers.carousels_detail = async (req, res) => {
  const { id } = req.params;
  
  const data = await Carousels.findAll({
    where: { id: id },
  })
  .then(function(data) {
    return data;
  })
  .catch(error => {
    return error;
  });
  
  res.json({ success: true, data: data });
};

controllers.carousels_update = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  const foto = req.file;

  try {
      const carousel = await Carousels.findByPk(id);
    
      if (!carousel) {
          return res.json({ success: false, message: 'Slide não encontrado' }); 
      }
    
      if (foto) {
          const midia = await Midia.create({
              binario: fs.readFileSync(foto.path),
              mimetype: foto.mimetype
          });
          
          fs.unlinkSync(foto.path);  
          
          carousel.fotoId = midia.id;  
      }
      
      carousel.titulo = titulo;
      carousel.descricao = descricao;
      
      await carousel.save();
      
      res.json({ success: true, message: 'Slide atualizado com sucesso', data: carousel });
  } catch (error) {
      console.log('Erro:', error);
      res.status(500).json({ success: false, message: 'Erro ao atualizar o slide' });
  }
};

controllers.carousels_delete = async (req, res) => {
  const { id } = req.body;
  
  const del = await Carousels.destroy({ 
    where: { id: id }
  });
  
  res.json({ success: true, deleted: del, message: 'Slide apagado com sucesso' });
};

module.exports = controllers;
