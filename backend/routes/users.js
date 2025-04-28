// web/backend/routes/users.js
const express = require('express');
const { protect, supervisorOnly } = require('../middleware/authMiddleware');
const { getUsers } = require('../controllers/userController');
const router = express.Router();
router.use(protect, supervisorOnly);
router.get('/', getUsers);
module.exports = router;
