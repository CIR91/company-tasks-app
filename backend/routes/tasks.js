// web/backend/routes/tasks.js
const express = require('express');
const { protect, supervisorOnly } = require('../middleware/authMiddleware');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();
router.use(protect);
router.post('/', createTask);
router.get('/',  getTasks);
router.put('/:id', updateTask);
router.delete('/:id', supervisorOnly, deleteTask);
module.exports = router;
