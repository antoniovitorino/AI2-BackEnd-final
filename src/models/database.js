/*
O código importa o módulo Sequelize do pacote sequelize para criar uma instância do Sequelize.
A instância do Sequelize é configurada com as informações de ligação com a Base de Dados.
O primeiro argumento da função Sequelize é o nome da Base de Dados, que é 'ai2_2aqm'.
O segundo argumento é o nome de utilizador da Base de Dados, que é 'ai2_2aqm_user'.
O terceiro argumento é a password da Base de Dados.
É fornecido um objeto de configuração adicional com as informações do host, porta, dialeto (no caso, 
'postgres' para PostgreSQL) e opções específicas do dialeto.
As opções de dialeto incluem a configuração do SSL para conexão segura com a Base de Dados, com a opção 
require: true para exigir SSL e rejectUnauthorized: false para não rejeitar conexões não autorizadas.
Após configurar a instância do Sequelize, o método sync() é chamado com { alter: true } para sincronizar 
os modelos com a Base de Dados, permitindo que o Sequelize faça alterações automáticas na estrutura da 
Base de Dados com base nas definições dos modelos. 
A instância do Sequelize é exportada para que possa ser utilizada noutros lugares.
*/

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ai2_2aqm', 'ai2_2aqm_user', 'rmIQeYR999h5cSrDeHQOiTFIfAt5gvIt', {
  host: 'dpg-ch95pgmkobicv5rsqjag-a.frankfurt-postgres.render.com',
  port: '5432',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.sync({ alter: true }); 

module.exports = sequelize;