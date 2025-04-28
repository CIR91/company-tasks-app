// web/backend/controllers/reportController.js
const Task = require('../models/Task');
const User = require('../models/User');
exports.summary = async (req, res) => {
  const users = await User.find({ company: req.user.companyId });
  const summary = await Promise.all(
    users.map(async u => {
      const completedCount = await Task.countDocuments({ assignedTo: u._id, completed: true });
      const pendingCount   = await Task.countDocuments({ assignedTo: u._id, completed: false });
      return { email: u.email, completedCount, pendingCount };
    })
  );
  res.json(summary);
};
