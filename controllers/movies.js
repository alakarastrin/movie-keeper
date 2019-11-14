const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Movie = require("../models/Movie");
const { getDocsByPage } = require("../helpers/docHelpers");

// @desc      Get all movies
// @route     GET /api/v1/movies
// @access    Public
exports.getMovies = asyncHandler(async (req, res, next) => {
  let { page, limit, order, orderBy } = req.query;

  const movies = await getDocsByPage(Movie, {}, page, limit);

  res.status(200).json({ success: true, count: movies.length, data: movies });
});

// @desc      Get single movie
// @route     GET /api/v1/movies/:id
// @access    Public
exports.getMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  // const movie = await Movie.findOne({ genre: req.params.id });
  // console.log('movies.js => GENRE =>', req.params.id);

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: movie });
});

// @desc      Create new movie
// @route     POST /api/v1/movies
// @access    Private
exports.createMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.create(req.body);

  res.status(201).json({
    success: true,
    data: movie
  });
});

// @desc      Update movie
// @route     PUT /api/v1/movies/:id
// @access    Private
exports.updateMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: movie });

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found with id ${req.params.id}`, 404)
    );
  }
});

// @desc      Delete movie
// @route     DELETE /api/v1/movies/:id
// @access    Private
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found with id ${req.params.id}`, 404)
    );
  }
});
