// web/backend/routes/reports.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { summary } = require('../controllers/reportController');
const router = express.Router();
router.use(protect);
router.get('/summary', summary);
module.exports = router;
