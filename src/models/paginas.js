/*
O código importa o módulo Sequelize para criar um modelo utilizando a biblioteca Sequelize.
O objeto sequelize é importado a partir do ficheiro database.js para estabelecer a ligação com a Base de Dados.
A variável Pagina é definida como um modelo do Sequelize, representando a tabela "paginas" na Base de Dados.
As colunas da tabela são definidas como propriedades do objeto Pagina. No exemplo, temos as colunas id, pagina, 
call_action, info, video e sobre.
A propriedade id é definida como um inteiro com a chave primária e auto incremento.
As outras propriedades estão definidas como strings (STRING) e sobre como texto (TEXT).
O objeto de configuração do modelo é definido com { timestamps: false }, o que desabilita o uso de campos de 
timestamps automáticos (como createdAt e updatedAt) no modelo.
O modelo Pagina é exportado para que possa ser utilizado noutros lugares.
*/

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