const mongoose = require("mongoose");

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
    enum: ["user", "publisher"],
    default: "user"
  },
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
