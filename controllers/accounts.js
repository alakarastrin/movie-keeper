const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Account = require("../models/Account");
// const { getDocsByPage } = require("../helpers/docHelpers");

// @desc      Get all accounts
// @route     GET /api/v1/accounts
// @access    Public
exports.getAccounts = asyncHandler(async (req, res, next) => {
  const accounts = await Account.find();

  res
    .status(200)
    .json({ success: true, count: accounts.length, data: accounts });
});

// @desc      Get single account
// @route     GET /api/v1/accounts/:id
// @access    Private
exports.getAccount = asyncHandler(async (req, res, next) => {
  const { id: accountId } = req.params;

  const account = await Account.findById(accountId);

  if (!account) {
    return next(new ErrorResponse(`No account with id ${accountId}`, 404));
  }

  return res.status(200).json({
    success: true,
    data: account
  });
});

// @desc      Add account
// @route     POST /api/v1/accounts
// @access    Private
exports.createAccount = asyncHandler(async (req, res, next) => {
  const account = await Account.create(req.body);

  res.status(201).json({
    success: true,
    data: account
  });
});

// @desc      Update account
// @route     PUT /api/v1/accounts/:id
// @access    Private
exports.updateAccount = asyncHandler(async (req, res, next) => {
  const account = await Account.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: account });

  if (!account) {
    return next(
      new ErrorResponse(`Account not found with id ${req.params.id}`, 404)
    );
  }
});

// @desc      Delete account
// @route     DELETE /api/v1/accounts/:id
// @access    Private
exports.deleteAccount = asyncHandler(async (req, res, next) => {
  const account = await Account.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });

  if (!account) {
    return next(
      new ErrorResponse(`Account not found with id ${req.params.id}`, 404)
    );
  }
});
