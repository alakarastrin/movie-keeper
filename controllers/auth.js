const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Account = require('../models/Account');
const Profile = require('../models/Profile');

// @desc      Register account
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  // Create new account
  const account = await Account.create({
    username,
    email,
    password,
    isAdmin,
  });

  // const profile =
  sendTokenResponse(account, 200, res);
});

// @desc      Login account
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  const account = await Account.findOne({ email }).select('+password');

  if (!account) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password match
  const isMatch = await account.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(account, 200, res);
});

// Get token from model and create cookie
const sendTokenResponse = (account, statusCode, res) => {
  // Create token
  const token = account.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};

// @desc      Get current logged in account
// @route     POST /api/v1/auth/current
// @access    Private
exports.getCurrent = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorResponse('Please provide email', 400));
  }

  const account = await Account.findOne({ email });

  res.status(200).json({
    success: true,
    data: account,
  });
});

// @desc      Update information
// @route     PUT /api/v1/auth/updateinfo
// @access    Private
exports.updateInfo = asyncHandler(async (req, res, next) => {
  const infoToUpdate = {
    username: req.body.username,
    email: req.body.email,
  };

  const account = await Account.findOneAndUpdate(
    { username, email },
    infoToUpdate,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    data: account,
  });
});
