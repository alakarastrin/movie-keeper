const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title'],
    maxlength: [50, 'Title can not be more than 50 characters'],
  },
  text: {
    type: String,
    maxlength: [1000, 'Text can not be more than 1000 characters'],
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
