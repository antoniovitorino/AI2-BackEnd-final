var Sequelize = require('sequelize'); 
var sequelize = require('./database');
var Cargo = require('./cargos'); 
var Midia = require('./midia'); 

var Equipa = sequelize.define('equipas', { 
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,        
        autoIncrement: true,     
    },
    nome: Sequelize.STRING,     
    numero_aluno: Sequelize.STRING,
    biografia: Sequelize.TEXT,
    fotoId: {
        type: Sequelize.INTEGER,
        references: {
            model: Midia, key: 'id'
        }
    },     
    cargoId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',  
        references: {
            model: Cargo, key: 'id',
            
        } 
    }
},
{
    timestamps: false,  
}
);


Equipa.belongsTo(Cargo); 
Equipa.belongsTo(Midia, { as: 'foto' }); 

module.exports = Equipa;
