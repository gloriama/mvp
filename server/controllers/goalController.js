var Goal = require('../models/goalModel.js');

module.exports = {

  //really updateOrCreate
  add: function(req, res, next) {
    console.log("received POST request to /goals", req.body);
    var name = req.body.name;
    var freq = req.body.freq;
    var points = req.body.points;
    var timesDone = req.body.timesDone;

    Goal.find({ name: name }, function(err, goals) {
      if (err) {
        return console.error(err);
      }

      if (goals.length === 0) {
        //add goal to db
        (new Goal({
          name: name,
          freq: freq,
          points: points,
          timesDone: timesDone
        })).save(function(err, goal) {
          if (err) {
            return console.error(err);
          }
          console.log("created new goal");
        });
      } else {
        console.log("goal already exists, updating");
        goals[0].name = name;
        goals[0].freq = freq;
        goals[0].points = points;
        goals[0].timesDone = timesDone;
        goals[0].save();
      }

      res.send(200);
    });
  },

  getAll: function(req, res, next) {
    console.log("received GET request to /goals");
    //res.json({goals: 4});
    Goal.find(function(err, goals) {
      if (err) {
        return console.error(err);
      }

      res.json(goals);
    });
  },

  delete: function(req, res, next) {
    console.log("received DELETE request to /goal/", req.path);
    var goalName = req.path.substring("/goal/".length);
    console.log(goalName);
    Goal.remove({name: goalName}, function(err, goal) {
      if (err) {
        return console.error(err)
      }
      res.send(200);
    });
  }
};