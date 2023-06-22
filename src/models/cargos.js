/*
O código importa o módulo Sequelize para criar um modelo utilizando a biblioteca Sequelize.
O objeto sequelize é importado a partir do arquivo database.js para estabelecer a ligação com a Base de Dados.
A variável Cargo é definida como um modelo do Sequelize, representando a tabela "cargo" na Base de Dados.
As colunas da tabela são definidas como propriedades do objeto Cargo. Temos as colunas id e cargo.
A propriedade id é definida como um inteiro com a chave primária e auto incremento.
A propriedade cargo é definida como uma string (STRING).
O objeto de configuração do modelo é definido com { timestamps: false }, o que desabilita o uso de campos de 
timestamps automáticos (como createdAt e updatedAt) no modelo.
Por fim, o modelo Cargo é exportado para que possa ser utilizado noutros lugares.
*/

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