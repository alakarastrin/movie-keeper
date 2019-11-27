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

const commentRouter = require('./comments');

const router = express.Router();

router.use('/:movieId/actors', actorRouter);

router.use('/:movieId/comments', commentRouter);

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
