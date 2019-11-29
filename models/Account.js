const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ObjectId } = mongoose.Schema.Types;

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Please add username'],
    maxlength: [50, 'Username can not be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false,
  },
  profile: {
    type: ObjectId,
    ref: 'Profile',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Encrypt password (bcryptjs)
AccountSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign jwt
AccountSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, profileId: this.profile, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );
};

// Match password
AccountSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Account', AccountSchema);
