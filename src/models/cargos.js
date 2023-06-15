var Sequelize = require('sequelize'); 
var sequelize = require('./database'); 


var Cargo = sequelize.define('cargo', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,        
        autoIncrement: true, 
      },
    cargo: Sequelize.STRING }, 
    {
        
        timestamps: false,
    }
);

module.exports = Cargo; 
