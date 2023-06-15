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

