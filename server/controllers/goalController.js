var Goal = require('../models/goalModel.js');

module.exports = {

  add: function(req, res, next) {
    console.log("received POST request to /goals", req.body);
    var name = req.body.name;
    var freq = req.body.freq;
    var points = req.body.points;
    var timesDone = req.body.timesDone;
    
    (new Goal({
      name: name,
      freq: freq,
      points: points,
      timesDone: timesDone
    })).save()
    .then(function(goal) {
      console.log("created new goal");
      res.send(200);
    });
  },

  update: function(req, res, next) {
    //console.log("received POST request to /goal/", req.body);
    var id = req.path.substring("/goal/".length);
    var name = req.body.name;
    var freq = req.body.freq;
    var points = req.body.points;
    var timesDone = req.body.timesDone;

    Goal.findOne({ _id: id }, function(err, goal) {
      if (err) {
        return console.error(err);
      }
      goal.name = name;
      goal.freq = freq;
      goal.points = points;
      goal.timesDone = timesDone;
      goal.save()
      .then(function(goal) {
        console.log("updated goal");
        res.send(200);
      });
    });
  },

  getOne: function(req, res, next) {
    var goalId = req.path.substring("/goal/".length);
    Goal.find({ _id: goalId }, function(err, goals) {
      if (err) {
        return console.error(err);
      }

      if (goals.length === 0) {
        console.log("goal doesn't exist");
        res.send(200);
      } else {
        res.json(goals[0]);
      }
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
    var goalId = req.path.substring("/goal/".length);
    Goal.remove({_id: goalId}, function(err, goal) {
      if (err) {
        return console.error(err)
      }
      res.send(200);
    });
  }
};