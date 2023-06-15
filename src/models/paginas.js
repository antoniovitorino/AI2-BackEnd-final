var Sequelize = require('sequelize'); 
var sequelize = require('./database'); 

var Pagina = sequelize.define('paginas', { 
    
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,        
        autoIncrement: true,     
    },

    pagina: Sequelize.STRING,
    call_action: Sequelize.STRING,
    info: Sequelize.STRING,     
    video: Sequelize.STRING,
    sobre: Sequelize.TEXT,       
},
{
    timestamps: false,  
}
); 

module.exports = Pagina;