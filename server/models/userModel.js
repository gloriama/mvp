var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  points: Number
});

module.exports = mongoose.model('User', UserSchema);