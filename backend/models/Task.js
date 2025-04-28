// web/backend/models/Task.js
const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title:       String,
  description: String,
  completed:   { type: Boolean, default: false },
  completedAt: Date,
  dueDate:     Date,
  assignedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  company:     { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
}, { timestamps: true });
module.exports = mongoose.model('Task', TaskSchema);
