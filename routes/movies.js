const express = require('express');
const { privateRoute, adminRoute } = require('../middleware/auth');

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies');

const actorRouter = require('./actors');

const router = express.Router();

router.use('/:MovieId/actors', actorRouter);

router
  .route('/')
  .get(getMovies)
  .post([privateRoute, adminRoute], createMovie);

router
  .route('/:id')
  .get(getMovie)
  .put([privateRoute, adminRoute], updateMovie)
  .delete([privateRoute, adminRoute], deleteMovie);

module.exports = router;
