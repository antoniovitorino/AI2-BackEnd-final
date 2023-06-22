/*
O código importa o modelo Regra do arquivo regras.js e o objeto sequelize do arquivo database.js.
O objeto controllers vazio é criado para armazenar todas as funções relacionadas ao controlador.
A função sequelize.sync() é chamada para sincronizar os modelos com a Base de Dados.
A função controllers.regra_list é uma função assíncrona que recupera todas as regras da Base de Dados 
usando o método Regra.findAll() e retorna os dados em formato JSON.
A função controllers.regra_create é uma função assíncrona que lida com a criação duma nova regra. Recebe 
os dados da regra (regra e descrição) por meio do corpo da requisição, cria uma nova instância do modelo Regra 
com esses dados e retorna os dados da regra criada em formato JSON.
A função controllers.regra_detail é uma função assíncrona que recupera os detalhes de uma regra específica com 
base no ID fornecido. Utiliza o método Regra.findAll() com uma cláusula where para buscar a regra correspondente 
na Base de Dados e retorna os dados em formato JSON.
A função controllers.regra_update é uma função assíncrona que lida com a atualização dos dados duma regra. Recebe 
o ID da regra a ser atualizada e os novos dados (regra e descrição) no corpo da requisição. Em seguida, utiliza o 
método Regra.findByPk() para buscar a regra pelo seu ID, atualiza os dados e salva a instância atualizada no 
Base de Dados. Por fim, retorna os dados da regra atualizada em formato JSON.
A função controllers.regra_delete é uma função assíncrona que lida com a exclusão de uma regra. Ela recebe o ID da 
regra a ser excluída no corpo da requisição, utiliza o método Regra.destroy() para remover a regra da Base de Dados 
e retorna uma mensagem de sucesso em formato JSON.
O objeto controllers é exportado para que possa ser utilizado noutros lugares.
*/

var sequelize = require('../models/database');
var Pagina = require('../models/paginas');

const controllers = {};

sequelize.sync();

controllers.pagina_list = async (req, res) => {
  const data = await Pagina.findAll({ 
    
  }) 
  .then(function(data) {
    return data;
  })
  .catch(error => {
    return error;
  });
  
  res.json({ success: true, data: data }); 
};

controllers.pagina_create = async (req, res) => {
    try {
      const {pagina, call_action, info, video, sobre} = req.body;
  
      const data = await Pagina.create({
        pagina: pagina,
        call_action: call_action,
        info: info,
        video: video,
        sobre: sobre
      });
  
      res.json({ success: true, message: 'Página criada com sucesso', data: data });
    } catch (error) {
      console.log('Erro:', error);
      res.status(500).json({ success: false, message: 'Erro ao criar página' });
    }
};

controllers.pagina_detail = async (req, res) => {
  const { id } = req.params;
  
  let pagina = await Pagina.findOne({
    where: { id: id }
  });

  if (!pagina) {
    pagina = await Pagina.create({
      pagina: 'Pagina default',
      call_action: 'Call action default',
      info: 'Info default',
      video: 'Video default',
      sobre: 'Sobre default'
    });
  }

  res.json({ success: true, data: [pagina] });
};

controllers.pagina_update = async (req, res) => {
  console.log(req.body); 
  console.log(req.files);
  const { id } = req.params;
  const { pagina, call_action, info, video, sobre } = req.body;

  try {
    const paginaObj = await Pagina.findByPk(id);

    if (!paginaObj) {
      return res.json({ success: false, message: 'Página não encontrada' });
    }

    paginaObj.pagina = pagina;
    paginaObj.call_action = call_action;
    paginaObj.info = info;
    paginaObj.video = video;
    paginaObj.sobre = sobre;

    await paginaObj.save();

    res.json({ success: true, message: 'Página atualizada com sucesso', data: paginaObj });
  } catch (error) {
    console.log('Erro:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar a página' });
  }
};

controllers.pagina_delete = async (req, res) => {
  const { id } = req.body;
  
  const del = await Pagina.destroy({ 
    where: { id: id }
  });
  
  res.json({ success: true, deleted: del, message: 'Página apagada com sucesso' });
};



module.exports = controllers;