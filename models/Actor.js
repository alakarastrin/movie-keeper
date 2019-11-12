const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add an actor name"],
    maxlength: [50, "Name can not be more than 50 characters"]
  },
  slug: String,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  },
  age: Number,
  born: String,
  // TODO: change movie to movies everywhere on actor
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ]
});

module.exports = mongoose.model("Actor", ActorSchema);
