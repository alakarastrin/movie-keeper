const express = require('express');

const {
  register,
  login,
  logout,
  getCurrent,
  updateInfo,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

const Account = require('../models/Account');

const router = express.Router();

const { privateRoute, adminRoute } = require('../middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);

router.get('/current', privateRoute, getCurrent);

router.put('/updateinfo', privateRoute, updateInfo);

router.put('/updatepassword', privateRoute, updatePassword);

router.post('/forgotpassword', forgotPassword);

router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
