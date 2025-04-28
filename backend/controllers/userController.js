// web/backend/controllers/userController.js
const User = require('../models/User');
exports.getUsers = async (req, res) => {
  const users = await User.find({ company: req.user.companyId }).select('name email role');
  res.json(users);
};
