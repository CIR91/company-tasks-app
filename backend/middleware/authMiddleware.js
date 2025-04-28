// web/backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token no proporcionado' });
  try {
    const { userId, role, companyId } = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    req.user = { id: userId, role, companyId };
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};

exports.supervisorOnly = (req, res, next) => {
  if (req.user.role !== 'supervisor')
    return res.status(403).json({ message: 'Acceso denegado' });
  next();
};
