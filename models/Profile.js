const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Please add username"],
    maxlength: [50, "Username can not be more than 50 characters"]
  },
  about: {
    type: String,
    maxlength: [200, "Description can not be more than 200 characters"]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  account: {
    type: ObjectId,
    ref: "Account"
  },
  movies: {
    liked: [{ type: ObjectId, ref: "Movie" }],
    watched: [{ type: ObjectId, ref: "Movie" }],
    rated: [{ type: ObjectId, ref: "Movie" }]
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
