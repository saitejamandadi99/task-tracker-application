const express = require('express');
const createProject = require('../controllers/projectControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/',authMiddleware, createProject);

module.exports = router;