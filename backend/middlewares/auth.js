const jwt = require('jsonwebtoken');

function auth(requiredRole = 'admin') {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const [, token] = header.split(' ');
      if (!token) return res.status(401).json({ error: 'Missing token' });
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

module.exports = auth;

