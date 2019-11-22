const express = require("express");
const {
  getActors,
  getActor,
  addActor,
  updateActor,
  deleteActor
} = require("../controllers/actors");

const { privateRoute, adminRoute } = require("../middleware/auth");

const Movie = require("../models/Movie");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getActors)
  .post([privateRoute, adminRoute], addActor);

router
  .route("/:id")
  .get(getActor)
  .put([privateRoute, adminRoute], updateActor)
  .delete([privateRoute, adminRoute], deleteActor);

module.exports = router;
