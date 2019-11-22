const express = require("express");

const Account = require("../models/Account");

const router = express.Router({ mergeParams: true });

router.post("/login", (req, res) => {});

module.exports = router;
