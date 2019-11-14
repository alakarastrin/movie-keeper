const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Actor = require("../models/Actor");
const Movie = require("../models/Movie");
const { getDocsByPage } = require("../helpers/docHelpers");

// @desc      Get all actors
// @route     GET /api/v1/actors?movieId=12345
// @route     GET /api/v1/movies/movieId/actors
// @access    Public
exports.getActors = asyncHandler(async (req, res, next) => {
  const { movieId, page, limit } = req.query;

  let actors;

  if (movieId) {
    actors = await getDocsByPage(Actor, { movie: movieId }, page, limit);
  } else {
    actors = await getDocsByPage(Actor, {}, page, limit);
  }

  res.status(200).json({
    success: true,
    count: actors.length,
    data: actors
  });
});

// @desc      Get single actor
// @route     GET /api/v1/actors/:id
// @access    Public
exports.getActor = asyncHandler(async (req, res, next) => {
  const { id: actorId } = req.params;

  const actor = await Actor.findById(actorId);

  if (!actor) {
    return next(new ErrorResponse(`No actor with id ${actorId}`, 404));
  }

  return res.status(200).json({
    success: true,
    data: actor
  });
});

// @desc      Add new actor
// @route     POST /api/v1/actors?movieId=1234
// @access    Private
exports.addActor = asyncHandler(async (req, res, next) => {
  const { movieId } = req.query;
  const actorData = req.body;

  const movie = await Movie.findById(movieId);

  if (!movie) {
    return next(new ErrorResponse(`No movie with id ${movieId}`, 404));
  }

  const actor = await Actor(actorData);

  movie.actors.push(actor.id);

  await movie.save();

  actor.movies.push(movieId);

  actor.save();

  return res.status(200).json({
    success: true,
    data: actor
  });
});

// @desc      Update actor
// @route     PUT /api/v1/actors/:id
// @access    Private
exports.updateActor = asyncHandler(async (req, res, next) => {
  let actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!actor) {
    return next(new ErrorResponse(`No actor with id ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: actor
  });
});

// @desc      Delete actor
// @route     DELETE /api/v1/actors/:id
// @access    Private
exports.deleteActor = asyncHandler(async (req, res, next) => {
  const actor = await Actor.findById(req.params.id);

  if (!actor) {
    return next(new ErrorResponse(`No actor with id ${req.params.id}`), 404);
  }

  await actor.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
