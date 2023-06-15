const sequelize = require('./models/database');
const Midia = require('./models/midia');
const Pagina = require('./models/paginas');
const Cargo = require('./models/cargos');
const Equipa = require('./models/equipas');
const Regra = require('./models/regras');
const User = require('./models/users');

async function createTables() {
  await Midia.sync({ alter: true });
  await Pagina.sync({ alter: true });
  await Cargo.sync({ alter: true });
  await Equipa.sync({ alter: true });
  await Regra.sync({ alter: true });
  await User.sync({ alter: true });
}

createTables();
