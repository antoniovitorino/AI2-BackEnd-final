const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const sequelize = require('../models/database'); 
const config = require('../config');

const controllers = {} 
sequelize.sync()

controllers.list = async (req, res) => { 
    const data = await User.findAll() 
    .then(function(data){
        return data; 
    })
    .catch(error => { 
        return error;
    });
    res.json({success: true,
    data: data
    });
}

controllers.register = async (req,res) => { 
    const { name, email, password } = req.body; 
    const data = await User.create({
        name: name, 
        email: email, 
        password: password
    }) 
    .then(function(data){
        return data; })
    .catch(error =>{ 
        console.log("Erro: "+error); 
        return error;
    })
    res.status(200).json({ success: true,
        message:"Registado",
        data: data 
    });
}
  

controllers.login = async (req,res) => {
  if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password; }
      var user = await User.findOne({where: { email: email}}) 
      .then(function(data){
          return data; 
      })
      .catch(error =>{ 
          console.log("Erro: "+error); 
          return error;
      })
  if (password === null || typeof password === "undefined") {
      res.status(403).json({ 
          success: false,
          message: 'Campos em Branco'
  });
  } else {
      if (req.body.email && req.body.password && user) {
          const isMatch = bcrypt.compareSync(password, user.password); 
          if (req.body.email === user.email && isMatch) {
            console.log(process.env.JWT_SECRET)
            let token = jwt.sign({email: req.body.email, name: user.name}, process.env.JWT_SECRET, {expiresIn: '1h'});


      res.json({
          success: true, 
          message: 'Autenticação realizada com sucesso!', token: token});
      } else {
          res.status(403).json({success: false, message: 'Dados de autenticação inválidos.'});
      }
  } else {
      res.status(400).json({success: false, message: 'Erro no processo de autenticação. Tente de novo mais tarde.'});
  }
  }
} 

controllers.update = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const [updatedRows] = await User.update(
    {
      name: name,
      email: email,
    },
    {
      where: { id: id },
    }
  );

  if (updatedRows > 0) {
    const updatedUser = await User.findOne({ where: { id: id } });

    res.status(200).json({
      success: true,
      message: "Dados atualizados",
      data: updatedUser,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Utilizador não encontrado",
    });
  }
};



controllers.delete = async (req, res) => {
  const { id } = req.body;
  const data = await User.destroy({
    where: { id: id }
  })
  .then(function(data){
    return data;
  })
  .catch(error => {
    console.log("Erro: " + error);
    return error;
  })
  res.status(200).json({
    success: true,
    message: "Utilizador apagado",
    data: data
  });
}

controllers.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id: id } })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });

  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Utilizador não encontrado",
    });
  }
};
    
module.exports = controllers;