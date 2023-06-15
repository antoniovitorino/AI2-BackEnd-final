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
