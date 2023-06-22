/*
O código importa o módulo Sequelize para criar um modelo utilizando a biblioteca Sequelize.
O objeto sequelize é importado a partir do arquivo database.js para estabelecer a ligação com a Base de Dados.
O modelo Cargo é importado a partir do arquivo cargos.js para ser utilizado como referência na tabela de equipas.
O modelo Midia é importado a partir do arquivo midia.js para ser utilizado como referência na tabela de equipas.
A variável Equipa é definida como um modelo do Sequelize, representando a tabela "equipas" na Base de Dados.
As colunas da tabela são definidas como propriedades do objeto Equipa. Temos as colunas id, nome, 
numero_aluno, biografia, fotoId e cargoId.
A propriedade id é definida como um inteiro com a chave primária e auto incremento.
As outras propriedades estão definidas como strings (STRING) e biografia como texto (TEXT).
A propriedade fotoId é definida como um inteiro que referencia a coluna id da tabela Midia.
A propriedade cargoId é definida como um inteiro que referencia a coluna id da tabela Cargo. A opção onDelete: 'CASCADE' 
indica que, ao excluir um cargo, as equipas associadas a esse cargo também serão excluídas.
O objeto de configuração do modelo é definido com { timestamps: false }, o que desabilita o uso de campos de timestamps 
automáticos (como createdAt e updatedAt) no modelo.
A função belongsTo é utilizada para estabelecer a associação entre a tabela de equipas e as tabelas de cargos e midias. 
A função belongsTo indica que uma equipa pertence a um cargo e a uma mídia (foto).
A opção as: 'foto' é utilizada para indicar que a relação entre Equipa e Midia é referente à coluna fotoId e será acedida 
através do nome "foto".
O modelo Equipa é exportado para que possa ser utilizado noutros lugares.
*/

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
