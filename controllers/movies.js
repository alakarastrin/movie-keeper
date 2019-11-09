// Create controller method associate with route

// @desc      Get all movies
// @route     GET /api/v1/movies
// @access    Public
exports.getMovies = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all movies' });
};

// @desc      Get single movie
// @route     GET /api/v1/movies/:id
// @access    Public
exports.getMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show movie ${req.params.id}` });
};

// @desc      Create new movie
// @route     POST /api/v1/movies
// @access    Private
exports.createMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new movie' });
};

// @desc      Update movie
// @route     PUT /api/v1/movies/:id
// @access    Private
exports.updateMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update movie ${req.params.id}` });
};

// @desc      Delete movie
// @route     DELETE /api/v1/movies/:id
// @access    Private
exports.deleteMovie = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete movie ${req.params.id}` });
};
