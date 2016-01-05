var User = require('../models/userModel.js');

module.exports = {

  add: function(req, res, next) {
    console.log("received POST request to /users", req.body);
    var name = req.body.name;
    var freq = req.body.freq;
    var points = req.body.points;
    var timesDone = req.body.timesDone;
    
    (new User({
      name: name,
      freq: freq,
      points: points,
      timesDone: timesDone
    })).save()
    .then(function(user) {
      console.log("created new user");
      res.send(200);
    });
  },

  update: function(req, res, next) {
    //console.log("received POST request to /user/", req.body);
    var id = req.path.substring("/user/".length);
    var name = req.body.name;
    var freq = req.body.freq;
    var points = req.body.points;
    var timesDone = req.body.timesDone;

    User.findOne({ _id: id }, function(err, user) {
      if (err) {
        return console.error(err);
      }
      user.name = name;
      user.freq = freq;
      user.points = points;
      user.timesDone = timesDone;
      user.save()
      .then(function(user) {
        console.log("updated user");
        res.send(200);
      });
    });
  },

  getOne: function(req, res, next) {
    var userIdOrName = req.path.substring("/user/".length);
    //horrible check, but if length is under 15 chars, treat it as a name
    var field = (userIdOrName.length < 15) ? 'name' : '_id';
    var queryObj = {};
    queryObj[field] = userIdOrName;
    User.find(queryObj, function(err, users) {
      if (err) {
        return console.error(err);
      }

      if (users.length === 0) {
        console.log("user doesn't exist");
        res.send(200);
      } else {
        res.json(users[0]);
      }
    });
  },


  getAll: function(req, res, next) {
    console.log("received GET request to /users");
    //res.json({users: 4});
    User.find(function(err, users) {
      if (err) {
        return console.error(err);
      }

      res.json(users);
    });
  },

  delete: function(req, res, next) {
    console.log("received DELETE request to /user/", req.path);
    var userId = req.path.substring("/user/".length);
    User.remove({_id: userId}, function(err, user) {
      if (err) {
        return console.error(err)
      }
      res.send(200);
    });
  }
};