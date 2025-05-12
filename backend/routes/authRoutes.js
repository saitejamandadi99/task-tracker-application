const express = require('express');
const {registerUser, LoginUser} = require('../controllers/authControllers');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', LoginUser);

module.exports = router;