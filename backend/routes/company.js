// web/backend/routes/company.js
const express = require('express');
const multer  = require('multer');
const { protect, supervisorOnly } = require('../middleware/authMiddleware');
const { getCompany, uploadLogo }  = require('../controllers/companyController');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.use(protect);
router.get('/', getCompany);
router.post('/logo', supervisorOnly, upload.single('logo'), uploadLogo);
module.exports = router;
