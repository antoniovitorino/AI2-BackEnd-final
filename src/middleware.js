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

