const Movie = require('../models/Movie');

// @desc      Get all movies
// @route     GET /api/v1/movies
// @access    Public
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();

    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc      Get single movie
// @route     GET /api/v1/movies/:id
// @access    Public
exports.getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc      Create new movie
// @route     POST /api/v1/movies
// @access    Private
exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc      Update movie
// @route     PUT /api/v1/movies/:id
// @access    Private
exports.updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: movie });

    if (!movie) {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc      Delete movie
// @route     DELETE /api/v1/movies/:id
// @access    Private
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });

    if (!movie) {
      return res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
