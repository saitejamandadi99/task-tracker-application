const {createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById} = require('../controllers/taskControllers');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createTask);
router.get('/project/:projectId', authMiddleware, getAllTasks); // ✅ for all tasks of a project
router.get('/:taskId', authMiddleware, getTaskById);           // ✅ for single task by id
router.put('/:taskId', authMiddleware, updateTaskById);
router.delete('/:taskId', authMiddleware, deleteTaskById);

module.exports = router;
