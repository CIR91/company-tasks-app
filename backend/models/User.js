// web/backend/models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['supervisor','employee'], required: true },
  company:  { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
