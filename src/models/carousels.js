var Sequelize = require('sequelize'); 
var sequelize = require('./database'); 
var Midia = require('./midia'); 

var Carousels = sequelize.define('carousel', { 
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,        
        autoIncrement: true,     
    },
    titulo: Sequelize.STRING,     
    descricao: Sequelize.STRING,
    fotoId: {
        type: Sequelize.INTEGER,
        references: {
            model: Midia, key: 'id'
        }
    },     
},
{
    timestamps: false,  
}
);

Carousels.belongsTo(Midia, { as: 'foto' }); 

module.exports = Carousels;
