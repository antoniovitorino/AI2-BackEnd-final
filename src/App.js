/*
A linha require('dotenv').config(); carrega as variáveis de ambiente definidas no arquivo .env para que possam ser acessadas no código.
No presente projeto, .env foi definido nas propriedades de configuração no servidor de alojamento render.com
O módulo express é importado para criar o servidor.
É criada uma instância da aplicação Express usando express().
Os roteadores específicos são importados dos seus respectivos ficheiros, como equipasRouters, cargosRouters, paginasRouters, etc. Estes 
roteadores serão responsáveis por lidar com as rotas correspondentes.
O módulo cors é importado para permitir requisições de origens diferentes. A origem permitida é definida como 'https://jogatanas.onrender.com' 
no objeto de configuração do cors.
A configuração do servidor é definida com app.set('port', process.env.PORT || 4000), que define a porta em que o servidor irá escutar. Usa a 
variável de ambiente PORT definida ou o valor padrão 4000.
São aplicados os middlewares. express.json() é usado para permitir que a aplicação Express parseie corpos de requisição no formato 
JSON. express.static('public') serve arquivos estáticos localizados na pasta public.
As rotas são definidas usando app.use(). Cada rota é associada a um roteador específico importado anteriormente. Por exemplo, app.use('/users', usersRouters) 
associa o roteador usersRouters à rota /users.
Uma rota adicional app.use('/', (req, res) => { res.send("AfterEnd by Jogatanas") }) é definida para tratar a raiz da aplicação.
Um middleware de tratamento de erros é definido com app.use((err, req, res, next) => { ... }). Ele é usado para lidar com erros na aplicação e enviar uma resposta 
de erro com status 500 e uma mensagem de "Something broke!".
Finalmente, o servidor é iniciado chamando app.listen() e especificando a porta em que o servidor deve escutar. O número da porta é obtido 
usando app.get('port').
*/

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
  origin: 'https://jogatanas.onrender.com' 
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