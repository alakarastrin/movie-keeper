const express = require('express');

const { privateRoute, adminRoute } = require('../middleware/auth');

const {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

const Movie = require('../models/Movie');

const Comment = require('../models/Comment');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(privateRoute, getComments)
  .post(privateRoute, addComment);

router
  .route('/:id')
  .get(privateRoute, getComment)
  .put(privateRoute, updateComment)
  .delete([privateRoute, adminRoute], deleteComment);

module.exports = router;
