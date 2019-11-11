const mongoose = require('mongoose');
const slugify = require('slugify');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a movie name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
    maxlength: [1000, 'Description can not be more than 1000 characters'],
  },
  genre: String,
  country: String,
  rating: Number,
  seasons: Number,
  release: String,
  forChildren: {
    type: Boolean,
  },
});

// Movie slug from the name
MovieSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Movie', MovieSchema);
