const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['true', 'Please add a movie name'],
    unique: true,
    trim: true,
    maxlength: [30, 'Name can not be more than 30 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: ['true', 'Please add a description'],
    unique: true,
    trim: true,
    maxlength: [200, 'Description can not be more than 200 characters'],
  },
  genre: String,
  country: String,
  rating: Number,
  seasons: Number,
  release: String,
});

module.exports = mongoose.model('Movie', MovieSchema);
