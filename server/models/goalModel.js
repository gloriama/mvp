var mongoose = require('mongoose');

var GoalSchema = new mongoose.Schema({
  name: String,
  freq: Number,
  points: Number,
  timesDone: Number,
  userId: String
});

module.exports = mongoose.model('Goal', GoalSchema);