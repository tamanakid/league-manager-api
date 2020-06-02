const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

	username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  isConfirmed: {
    type: Boolean,
    required: true,
    default: false
  },

});


userSchema.index({ username: 1 });


module.exports = mongoose.model('user', userSchema);