/*
O código importa os módulos jsonwebtoken, bcrypt e User do modelo users, bem como o sequelize, config e 
define o objeto controllers vazio para armazenar todas as funções relacionadas ao controlador.
O método sequelize.sync() é chamado para sincronizar os modelos com a Base de Dados.
A função controllers.list é uma função assíncrona que recupera todos os utilizadores da Base de Dados através 
do método User.findAll() e retorna os dados em formato JSON.
A função controllers.register é uma função assíncrona que recebe os dados do utilizador (nome, email e password) 
por meio do corpo da requisição, cria um novo utilizador na Base de Dados usando o método User.create() e retorna 
os dados do utilizador registrado em formato JSON.
A função controllers.login é uma função assíncrona que lida com o processo de autenticação do utilizador. Verifica 
se o email e a password foram fornecidos na requisição e, em seguida, busca o utilizador correspondente na base de 
Dados usando o método User.findOne(). Se o utilizador existir, a função verifica se a senha fornecida corresponde 
à senha armazenada na Base de Dados usando bcrypt.compareSync(). Se a autenticação for bem-sucedida, um token JWT 
é gerado e retornado em formato JSON.
A função controllers.update é uma função assíncrona que lida com a atualização dos dados de um utilizador. Recebe o 
ID do utilizador a ser atualizado e os novos dados (nome e email) no corpo da requisição. Em seguida, utiliza o método
 User.update() para atualizar os dados na Base de Dados e retorna os dados atualizados do utilizador em formato JSON.
A função controllers.delete é uma função assíncrona que lida com a exclusão de um utilizador. Recebe o ID do utilizador 
a ser excluído no corpo da requisição, utiliza o método User.destroy() para remover o utilizador da Base de Dados e 
retorna uma mensagem de sucesso em formato JSON.
A função controllers.getUserById é uma função assíncrona que recupera um utilizador pelo seu ID. Recebe o ID do 
utilizador como parâmetro na rota, utiliza o método User.findOne() para buscar o utilizador correspondente na Base de 
Dados e retorna os dados do utilizador em formato JSON.
O objeto controllers é exportado para que possa ser utilizado em outros lugares.
*/

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