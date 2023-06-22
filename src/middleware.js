/*
O código utiliza o módulo jsonwebtoken para lidar com tokens JWT (JSON Web Tokens) e o módulo config para importar configurações adicionais.
A função checkToken é uma função de middleware que verifica a presença e validade do token de autenticação em requisições.
A linha let token = req.headers['x-access-token'] || req.headers['authorization']; obtém o token a partir dos cabeçalhos da requisição. Pode estar presente no cabeçalho x-access-token ou authorization.
A condição if (token && token.startsWith('Bearer ')) verifica se o token existe e tem o prefixo "Bearer ". Se sim, remove esse prefixo para obter apenas o token.
A variável isPublicRoute é uma verificação lógica para determinar se a rota atual é uma rota pública que não requer autenticação. É baseada no caminho da requisição e verifica se contém alguns valores específicos relacionados a rotas públicas.
A variável isDashboardRoute verifica se a rota atual pertence ao dashboard, também com base no caminho da requisição.
A condição if (token && !isPublicRoute && !isDashboardRoute) verifica se o token existe e se a rota não é pública nem do dashboard. Nesse caso, o token é verificado utilizando jwt.verify, passando o token, a chave secreta e uma função de callback para tratar o resultado da verificação.
Se ocorrer algum erro na verificação do token, é retornado um JSON com a propriedade success como false e a mensagem de erro correspondente.
Caso contrário, o token é considerado válido, o objeto decoded é anexado à requisição (req.decoded) e a função next() é chamada para permitir que a requisição prossiga para o próximo middleware ou rota.
Se o token não existe ou a rota é pública ou do dashboard, não é necessária a autenticação, e a função next() é chamada diretamente para permitir que a requisição prossiga.
*/

const jwt = require('jsonwebtoken');
const config = require('./config');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  // Verificar se a rota é pública (cargos, carousels, equipas, midia, paginas, regras)
  const isPublicRoute = req.path.includes('/cargos') ||
    req.path.includes('/carousels') ||
    req.path.includes('/equipas') ||
    req.path.includes('/midia') ||
    req.path.includes('/paginas') ||
    req.path.includes('/regras');

  // Verificar se a rota é do dashboard
  const isDashboardRoute = req.path.includes('/dashboard');

  if (token && !isPublicRoute && !isDashboardRoute) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'O token não é válido.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // Rota pública ou do dashboard, não requer autenticação
    next();
  }
};

module.exports = { checkToken: checkToken };