// web/backend/models/Company.js
const mongoose = require('mongoose');
const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String
}, { timestamps: true });
module.exports = mongoose.model('Company', CompanySchema);
