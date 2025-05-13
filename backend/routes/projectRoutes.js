const express = require('express');
const {createProject, getAllProjects, deleteProjectById} = require('../controllers/projectControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create',authMiddleware, createProject);
router.get('/', authMiddleware, getAllProjects);
router.delete('/:projectId', authMiddleware, deleteProjectById)

module.exports = router;