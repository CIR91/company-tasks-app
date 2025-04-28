exports.register = async (req, res) => {
  const { name, email, password, role, companyName, companyId } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }
  if (role === 'supervisor' && !companyName) {
    return res.status(400).json({ message: 'companyName es obligatorio para supervisors' });
  }
  if (role === 'employee' && !companyId) {
    return res.status(400).json({ message: 'companyId es obligatorio para empleados públicos' });
  }
  // ... resto del código
};
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
const Company = require('../models/Company');

exports.register = async (req, res) => {
  const { name, email, password, role, companyName, companyId } = req.body;
  let compId = companyId;
  if (role === 'supervisor') {
    const newCompany = await Company.create({ name: companyName });
    compId = newCompany._id;
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role, company: compId });
  const token = jwt.sign({ userId: user._id, role: user.role, companyId: compId }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });
  const token = jwt.sign(
    { userId: user._id, role: user.role, companyId: user.company },
    process.env.JWT_SECRET
  );
  res.json({ token });
};
