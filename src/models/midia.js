/*
O código importa o Model e o DataTypes do Sequelize para definir o modelo de Midia.
A classe Midia é definida como uma extensão do Model do Sequelize.
A função init é chamada na classe Midia para definir os atributos e configurações do modelo.
Os atributos do modelo são definidos dentro de um objeto, onde cada chave representa o nome do atributo e o 
valor representa o tipo de dado. Temos os atributos id, binario e mimetype.
O atributo id é definido como um inteiro com chave primária e auto incremento.
O atributo binario é definido como um BLOB (Binary Large Object) para armazenar dados binários, como imagens, 
e é obrigatório (allowNull: false).
O atributo mimetype é definido como uma string que representa o tipo de mídia, como o mimetype de uma imagem ou vídeo, 
e também é obrigatório.
O objeto de configuração do modelo é definido com sequelize como a instância do Sequelize para a ligação com a Base de Dados, 
modelName como o nome do modelo e timestamps: false para desabilitar o uso de campos de timestamps automáticos (como createdAt 
e updatedAt) no modelo.
A classe Midia é exportada para que possa ser utilizada noutros lugares.
*/

const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Midia extends Model {}

Midia.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  binario: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Midia',
  timestamps: false
});

module.exports = Midia;