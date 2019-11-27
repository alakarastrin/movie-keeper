const express = require('express');

const { privateRoute, adminRoute } = require('../middleware/auth');

const {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} = require('../controllers/accounts');

const Account = require('../models/Account');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAccounts)
  .post([privateRoute, adminRoute], createAccount);

router
  .route('/:id')
  .get(getAccount)
  .put([privateRoute, adminRoute], updateAccount)
  .delete([privateRoute, adminRoute], deleteAccount);

module.exports = router;
