const mongoose = require('mongoose');
const slugify = require('slugify');

const { ObjectId } = mongoose.Schema.Types;

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
  genre: [
    {
      type: String,
      required: [true, 'Please add a genre'],
      enum: [
        'crime drama',
        'detective',
        'fantasy',
        'teen drama',
        'drama',
        'supernatural fiction',
        'action',
        'horror',
        'supernatural horror',
        'superhero',
        'mystery',
        'crime',
      ],
    },
  ],
  country: String,
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add rating between 1 and 10'],
  },
  seasons: Number,
  release: String,
  forChildren: {
    type: Boolean,
  },
  actors: [
    {
      type: ObjectId,
      ref: 'Actor',
    },
  ],
  comments: [
    {
      type: ObjectId,
      ref: 'Comment',
    },
  ],
  accounts: [
    {
      type: ObjectId,
      ref: 'Account',
    },
  ],
});

// Movie slug from the name
MovieSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Movie', MovieSchema);
