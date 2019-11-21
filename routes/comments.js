const express = require("express");
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment
} = require("../controllers/comments");

const Comment = require("../models/Comment");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getComments)
  .post(createComment);

router
  .route("/:id")
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
