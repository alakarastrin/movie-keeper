const express = require("express");
const {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount
} = require("../controllers/accounts");

const Account = require("../models/Account");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAccounts)
  .post(createAccount);

router
  .route("/:id")
  .get(getAccount)
  .put(updateAccount)
  .delete(deleteAccount);

module.exports = router;
