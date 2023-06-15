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