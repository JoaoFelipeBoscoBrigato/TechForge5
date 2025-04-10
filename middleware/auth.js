const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acesso negado' });
    
    try {
      const verified = jwt.verify(token, 'SEGREDO');
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Token inválido' });
    }
  };

module.exports = auth;