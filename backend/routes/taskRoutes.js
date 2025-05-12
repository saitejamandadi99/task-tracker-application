const {createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById} = require('../controllers/taskControllers');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getAllTasks);
router.get('/:taskId', authMiddleware, getTaskById)
router.put('/:taskId', authMiddleware, updateTaskById);
router.delete('/:taskId', authMiddleware, deleteTaskById);

module.exports = router;
