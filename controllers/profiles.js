const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Profile = require('../models/Profile');
const Account = require('../models/Account');
const { getDocsByPage } = require('../helpers/docHelpers');

// @desc      Get all profiles
// @route     GET /api/v1/profiles
// @access    Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const { profileId, page, limit } = req.query;

  let profiles;

  if (profileId) {
    profiles = await getDocsByPage(
      Profile,
      { profile: profileId },
      page,
      limit,
    );
  } else {
    profiles = await getDocsByPage(Profile, {}, page, limit);
  }

  res.status(200).json({
    success: true,
    count: profiles.length,
    data: profiles,
  });
});

// @desc      Get single profile
// @route     GET /api/v1/profiles/:id
// @access    Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const { id: profileId } = req.params;

  const profile = await Profile.findById(profileId);

  if (!profile) {
    return next(new ErrorResponse(`No profile with id ${profileId}`, 404));
  }

  return res.status(200).json({
    success: true,
    data: profile,
  });
});

// @desc      Add profile
// @route     POST /api/v1/profiles
// @access    Private
exports.addProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.create(req.body);

  await Account.findByIdAndUpdate(req.accountId, {
    $set: { profile: profile.id },
  });

  res.status(201).json({
    success: true,
    data: profile,
  });
});

// @desc      Update profile
// @route     PUT /api/v1/profiles/:id
// @access    Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  let profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!profile) {
    return next(new ErrorResponse(`No profile with id ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

// @desc      Delete profile
// @route     DELETE /api/v1/profiles/:id
// @access    Private
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(new ErrorResponse(`No profile with id ${req.params.id}`), 404);
  }

  await profile.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
