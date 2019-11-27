const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');
const Movie = require('../models/Movie');
const { getDocsByPage } = require('../helpers/docHelpers');

// @desc      Get all comments
// @route     GET /api/v1/comments
// @route     GET /api/v1/movies/movieId/comments
// @access    Public
exports.getComments = asyncHandler(async (req, res, next) => {
  const { movieId, page, limit } = req.query;

  let comments;

  if (movieId) {
    comments = await getDocsByPage(Comment, { movie: movieId }, page, limit);
  } else {
    comments = await getDocsByPage(Comment, {}, page, limit);
  }

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

// @desc      Get single comment
// @route     GET /api/v1/comments/:id
// @access    Private
exports.getComment = asyncHandler(async (req, res, next) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new ErrorResponse(`No comment with id ${commentId}`, 404));
  }

  return res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc      Add comment
// @route     POST /api/v1/comments?movieId=1234
// @access    Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const { movieId } = req.query;
  const commentData = req.body;

  const movie = await Movie.findById(movieId);

  if (!movie) {
    return next(new ErrorResponse(`No movie with id ${movieId}`, 404));
  }

  const comment = await Comment(commentData);

  movie.comments.push(comment.id);

  await movie.save();

  comment.movies.push(movieId);

  comment.save();

  return res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc      Update comment
// @route     PUT /api/v1/comments/:id
// @access    Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!comment) {
    return next(new ErrorResponse(`No comment with id ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc      Delete comment
// @route     DELETE /api/v1/comments/:id
// @access    Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    return next(new ErrorResponse(`No comment with id ${req.params.id}`), 404);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});
