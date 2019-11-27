const express = require('express');

const { privateRoute, adminRoute } = require('../middleware/auth');

const {
  getProfiles,
  getProfile,
  addProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profiles');

const Profile = require('../models/Profile');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getProfiles)
  .post([privateRoute, adminRoute], addProfile);

router
  .route('/:id')
  .get(getProfile)
  .put([privateRoute, adminRoute], updateProfile)
  .delete([privateRoute, adminRoute], deleteProfile);

module.exports = router;
