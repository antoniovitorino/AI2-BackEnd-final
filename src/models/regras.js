/*
O código importa o módulo Sequelize para criar um modelo utilizando a biblioteca Sequelize.
O objeto sequelize é importado a partir do ficheiro database.js para estabelecer a ligação com a base de dados.
A variável Regra é definida como um modelo do Sequelize, representando a tabela "regra" na base de dados.
As colunas da tabela são definidas como propriedades do objeto Regra. Temos as colunas id, regra e descricao.
A propriedade id é definida como um inteiro com a chave primária e auto incremento.
As propriedades regra e descricao são definidas como strings.
O objeto de configuração do modelo é definido com { timestamps: false }, o que desabilita o uso de campos de 
timestamps automáticos (como createdAt e updatedAt) no modelo.
O modelo Regra é exportado para que possa ser utilizado noutros lugares.
*/

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