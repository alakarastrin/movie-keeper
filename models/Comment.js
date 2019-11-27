const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

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
    required: [true, 'Please add a comment text'],
  },
  profileId: {
    type: ObjectId,
    ref: 'Profile',
  },
  movies: [
    {
      type: ObjectId,
      ref: 'Movie',
    },
  ],
});

module.exports = mongoose.model('Comment', CommentSchema);
