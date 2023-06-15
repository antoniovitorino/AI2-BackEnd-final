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
