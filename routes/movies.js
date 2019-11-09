const express = require('express');
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies');

const router = express.Router();

router
  .route('/')
  .get(getMovies)
  .post(createMovie);

router
  .route('/:id')
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;
