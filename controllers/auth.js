const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
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

// @desc      Log account out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Get current logged in account
// @route     POST /api/v1/auth/current
// @access    Private
exports.getCurrent = asyncHandler(async (req, res, next) => {
  const account = await Account.findById(req.accountId);

  if (!account) {
    return res.status(404).json({ success: false, msg: 'Account not found!' });
  }

  res.status(200).json(account);
});

// @desc      Update info
// @route     PUT /api/v1/auth/updateinfo
// @access    Private
exports.updateInfo = asyncHandler(async (req, res, next) => {
  const infoToUpdate = {
    username: req.body.username,
    email: req.body.email,
  };

  const account = await Account.findByIdAndUpdate(req.accountId, infoToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: account,
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const account = await Account.findById(req.accountId).select('+password');

  // Check current password
  if (!(await account.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  account.password = req.body.newPassword;
  await account.save();

  sendTokenResponse(account, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const account = await Account.findOne({ email: req.body.email });

  if (!account) {
    return next(new ErrorResponse('There is no account with that email', 404));
  }

  // Get reset token
  const resetToken = account.getResetPasswordToken();

  await account.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: account.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (error) {
    console.log(error);
    account.resetPasswordToken = undefined;
    account.resetPasswordExpire = undefined;

    await account.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const account = await Account.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!account) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  // Set new password
  account.password = req.body.password;
  account.resetPasswordToken = undefined;
  account.resetPasswordExpire = undefined;
  await account.save();

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
