var Goal = require('../models/goalModel.js');

module.exports = {
  getAll: function(req, res, next) {
    console.log("returning all goals");
    res.json({goals: 4});
  }
};