const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ msg: 'Token no proporcionado' });

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;            // aquí metemos: { id: <userId>, … }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};
