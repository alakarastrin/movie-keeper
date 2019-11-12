const express = require("express");
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movies");

const actorRouter = require("./actors");

const router = express.Router();

router.use("/:MovieId/actors", actorRouter);

router
  .route("/")
  .get(getMovies)
  .post(createMovie);

router
  .route("/:id")
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;
