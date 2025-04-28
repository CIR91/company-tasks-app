// web/backend/controllers/taskController.js
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    assignedBy: req.user.id,
    company: req.user.companyId
  });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const filter = req.user.role === 'employee'
    ? { assignedTo: req.user.id }
    : { company: req.user.companyId };
  const tasks = await Task.find(filter)
    .populate('assignedTo', 'name email')
    .populate('assignedBy', 'name email');
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'No encontrado' });
  if (req.user.role === 'employee' && task.assignedTo.toString() !== req.user.id)
    return res.status(403).json({ message: 'No autorizado' });
  Object.assign(task, req.body);
  if (req.body.completed) task.completedAt = new Date();
  await task.save();
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'No encontrado' });
  await task.remove();
  res.json({ message: 'Eliminado' });
};
