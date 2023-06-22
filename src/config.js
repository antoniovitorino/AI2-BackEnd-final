/*
Exporta um objeto contendo a propriedade jwtSecret, que armazena o valor da variável de ambiente JWT_SECRET.
Essa exportação permite que outros módulos acessem o segredo do JWT (JSON Web Token) definido na variável de 
ambiente JWT_SECRET através da importação deste módulo
*/

module.exports = {
  jwtSecret: process.env.JWT_SECRET
};