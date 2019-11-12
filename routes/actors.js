const express = require("express");
const {
  getActors,
  getActor,
  addActor,
  updateActor,
  deleteActor
} = require("../controllers/actors");

const Movie = require("../models/Movie");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getActors)
  .post(addActor);

router
  .route("/:id")
  .get(getActor)
  .put(updateActor)
  .delete(deleteActor);

module.exports = router;
