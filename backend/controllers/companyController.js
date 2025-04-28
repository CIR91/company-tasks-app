// web/backend/controllers/companyController.js
const Company = require('../models/Company');
exports.getCompany = async (req, res) => {
  const company = await Company.findById(req.user.companyId);
  res.json(company);
};
exports.uploadLogo = async (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  await Company.findByIdAndUpdate(req.user.companyId, { logo: filePath });
  res.json({ logo: filePath });
};
