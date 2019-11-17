const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Please add username"],
    maxlength: [50, "Username can not be more than 50 characters"]
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 8,
    select: false
  }
});

module.exports = mongoose.model("Account", AccountSchema);
