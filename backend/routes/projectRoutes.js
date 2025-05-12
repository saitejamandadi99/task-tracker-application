const express = require('express');
const {createProject} = require('../controllers/projectControllers');

const router = express.Router();

router.post('/', createProject);

module.exports = router;