const express = require('express');
const {createProject, getAllProjects} = require('../controllers/projectControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create',authMiddleware, createProject);
router.get('/', authMiddleware, getAllProjects);

module.exports = router;