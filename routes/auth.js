const express = require('express');

const {
  register,
  login,
  getCurrent,
  updateInfo,
} = require('../controllers/auth');

const Account = require('../models/Account');

const router = express.Router();

const { privateRoute, adminRoute } = require('../middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.get('/current', privateRoute, getCurrent);

module.exports = router;
