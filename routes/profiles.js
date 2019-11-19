const express = require("express");
const {
  getProfiles,
  getProfile,
  addProfile,
  updateProfile,
  deleteProfile
} = require("../controllers/profiles");

const Profile = require("../models/Profile");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getProfiles)
  .post(addProfile);

router
  .route("/:id")
  .get(getProfile)
  .put(updateProfile)
  .delete(deleteProfile);

module.exports = router;
