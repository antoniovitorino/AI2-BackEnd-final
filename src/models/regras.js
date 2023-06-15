var Sequelize = require('sequelize'); 
var sequelize = require('./database'); 

var Regra = sequelize.define('regra', { 
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,        
        autoIncrement: true,     
    },
    regra: Sequelize.STRING,
    descricao: Sequelize.STRING      
},
{
    timestamps: false,  
}
); 

module.exports = Regra;