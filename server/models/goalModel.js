var mongoose = require('mongoose');

var GoalSchema = new mongoose.Schema({
  name: String;
  freq: Number;
  points: Number;
});

module.exports = mongoose.model('Goal', GoalSchema);