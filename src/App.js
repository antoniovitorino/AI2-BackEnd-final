require('dotenv').config();
const express = require('express');
const app = express();
const equipasRouters = require('./routes/equipasRoutes');
const cargosRouters = require('./routes/cargosRoutes');
const paginasRouters = require('./routes/paginasRoutes');
const carouselsRouters = require('./routes/carouselsRoutes');
const usersRouters = require('./routes/usersRoutes');
const midiaRouters = require('./routes/midiaRoutes');
const regrasRouters = require('./routes/regrasRoutes');
const cors = require('cors');

// Configurações
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
  origin: 'http://localhost:3000' 
}));

// Rotas
app.use('/users', usersRouters);
app.use('/midia', midiaRouters);
app.use('/cargos', cargosRouters);
app.use('/regras', regrasRouters);
app.use('/equipas', equipasRouters);
app.use('/paginas', paginasRouters);
app.use('/carousels', carouselsRouters);
app.use('/', (req, res) =>{res.send("AfterEnd by Jogatanas")});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Escutar
app.listen(app.get('port'),()=>{
  console.log("Start server on port "+app.get('port'))
})
