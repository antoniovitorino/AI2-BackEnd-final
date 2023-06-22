/*
O modelo Midia é importado a partir do arquivo midia.js para ser utilizado como referência na tabela de carousels.
A variável Carousels é definida como um modelo do Sequelize, representando a tabela "carousel" na Base de Dados.
As colunas da tabela são definidas como propriedades do objeto Carousels. Temos as colunas id, titulo, descricao e fotoId.
A propriedade id é definida como um inteiro com a chave primária e auto incremento.
As demais propriedades são definidas como strings (STRING).
A propriedade fotoId é definida como um inteiro que referencia a coluna id da tabela Midia.
O objeto de configuração do modelo é definido com { timestamps: false }, o que desabilita o uso de campos de timestamps 
automáticos (como createdAt e updatedAt) no modelo.
A função belongsTo é utilizada para estabelecer a associação entre a tabela de carousels e a tabela de midia. 
A função belongsTo indica que um carousel pertence a uma mídia (foto).
A opção as: 'foto' é utilizada para indicar que a relação entre Carousels e Midia é referente à coluna fotoId e será 
acedida através do nome "foto".
O modelo Carousels é exportado para que possa ser utilizado noutros lugares.
*/

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