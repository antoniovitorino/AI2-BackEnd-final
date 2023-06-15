const Sequelize = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt'); //encripta a pass a guardar na BD

var User = sequelize.define('users', { id: {
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