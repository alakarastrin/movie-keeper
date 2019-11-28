const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const ActorSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   trim: true,
  //   required: [true, "Please add an actor name"],
  //   maxlength: [50, "Name can not be more than 50 characters"]
  // },
  name: {
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
    },
    middle: {
      type: String,
    },
  },
  slug: String,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  age: Number,
  born: {
    country: {
      type: String,
      required: [true, 'Please add actor country'],
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  movies: [
    {
      type: ObjectId,
      ref: 'Movie',
    },
  ],
});

module.exports = mongoose.model('Actor', ActorSchema);
