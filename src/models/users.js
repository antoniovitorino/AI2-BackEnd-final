/*
O código importa o módulo Sequelize para criar um modelo utilizando a biblioteca Sequelize.
O objeto sequelize é importado a partir do ficheiro database.js para estabelecer a ligação com a Base de dados.
A variável User é definida como um modelo do Sequelize, representando a tabela "users" na Base de Dados.
As colunas da tabela são definidas como propriedades do objeto User. Temos as colunas id, name, email e password.
A propriedade id é definida como um inteiro com a chave primária e auto incremento.
A propriedade email é definida como uma string não nula e única, o que garante que cada utilizador tenha um email único.
A propriedade password é definida como uma string não nula.
O objeto de configuração do modelo é definido com { timestamps: false }, o que desabilita o uso de campos de timestamps 
automáticos (como createdAt e updatedAt) no modelo.
O método beforeCreate é utilizado para executar uma função antes de criar um novo utilizador na Base de Dados.
Dentro da função, a password do utilizador é encriptada usando a função bcrypt.hash com um fator de custo de 10 
(valor maior significa mais segurança, mas também mais tempo de processamento).
O hash resultante é atribuído à propriedade password do utilizador.
Se ocorrer algum erro durante o processo de encriptação, uma exceção é lançada.
O modelo User é exportado para que possa ser utilizado noutros lugares.
*/

const Sequelize = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt'); //encripta a password a guardar na BD

var User = sequelize.define('users', { 
    id: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true,
    },
        name: Sequelize.STRING, 
        email: {
            type: Sequelize.STRING, allowNull: false,
            unique: true 
        },
        password:{
            type: Sequelize.STRING, allowNull: false
        } 
    }, 
    {
    timestamps: false, 
    }
);

User.beforeCreate((user, options) => { 
    return bcrypt.hash(user.password, 10) 
    .then(hash => {
        user.password = hash; 
    })
    .catch(err => {
        throw new Error();
    }); 
});

module.exports = User;