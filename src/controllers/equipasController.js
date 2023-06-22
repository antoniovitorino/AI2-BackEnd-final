/*
O código importa as dependências multer, path e fs para lidar com upload de ficheiros e manipulação do sistema de ficheiros.
O objeto upload é criado usando o multer para configurar o destino dos ficheiros enviados.
As dependências de modelo e o objeto sequelize são importados dos respectivos ficheiros.
O objeto controllers vazio é criado para armazenar todas as funções relacionadas ao controlador.
A função sequelize.sync() é chamada para sincronizar os modelos com a Base de Dados.
A função controllers.equipa_list é responsável por buscar e retornar todos os membros da equipa. Usa o método Equipa.findAll() 
para buscar os membros da equipa na Base de Dados. A opção include é usada para incluir o modelo Cargo relacionado. Os membros 
da equipa são ordenados pelo ID em ordem descendente.
A função controllers.equipa_create é responsável por criar um novo membro da equipa. Recebe os dados do membro da equipa e o 
ficheiro de foto enviados na requisição. Um novo registo é criado na tabela Midia para salvar a foto. O conteúdo binário da foto 
é lido e salvo na base de dados, e o ficheiro da foto é removido do sistema de ficheiros. Em seguida, um novo registo é criado na 
tabela Equipa com os dados fornecidos e o ID da foto criada.
A função controllers.equipa_detail é responsável por buscar e retornar um membro específico da equipa com base no ID fornecido na 
requisição. Usa o método Equipa.findAll() com a opção where para buscar o membro da equipa com o ID correspondente na Base de Dados. 
A opção include é usada para incluir o modelo Cargo relacionado.
A função controllers.equipa_update é responsável por atualizar um membro da equipa existente. Recebe o ID do membro da equipa, os 
dados atualizados e o ficheiro de foto enviados na requisição. O membro da equipa correspondente é buscado no base de dados e os 
dados são atualizados de acordo com as informações fornecidas. Se uma nova foto for fornecida, um novo registo é criado na tabela 
Midia para salvar a foto. O conteúdo binário da foto é lido e salvo na base de dados, e o ficheiro da foto é removido do sistema 
de ficheiros. O ID da foto é atualizado no registo do membro da equipa.
A função controllers.equipa_delete é responsável por excluir um membro da equipa existente. Recebe o ID do membro da equipa a ser 
excluído e o exclui da Base de Dados.
O objeto controllers é exportado para ser usado noutros ficheiros.
*/

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
      
      fs.unlinkSync(foto.path);  

      const data = await Equipa.create({
          nome: nome,
          numero_aluno: numero_aluno,
          biografia: biografia,
          fotoId: midia.id,  
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
          
          fs.unlinkSync(foto.path); 
          
          equipa.fotoId = midia.id; 
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