var User = require('../models/userModel.js');

module.exports = {

  //really updateOrCreate
  add: function(req, res, next) {
    console.log("received POST request to /users", req.body);
    var name = req.body.name;
    var password = req.body.password;
    var points = req.body.points;

    User.find({ name: name }, function(err, users) {
      if (err) {
        return console.error(err);
      }

      if (users.length === 0) {
        //add user to db
        var user = new User({
          name: name,
          password: password,
          points: points
        });
        user.save(function(err, user) {
          if (err) {
            return console.error(err);
          }
          console.log("created new user");
          res.json(user);
        });
      } else {
        var user = users[0];
        user.name = name;
        user.password = password;
        user.points = points;
        user.save(function(err, user) {
          if (err) {
            return console.error(err);
          }
          console.log("user already exists, updated");
          res.json(user);
        });
      }
    });
  },

  getOne: function(req, res, next) {
    var userName = req.path.substring("/user/".length);
    User.find({ name: userName }, function(err, users) {
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
    var userName = req.path.substring("/user/".length);
    console.log(userName);
    User.remove({name: userName}, function(err, user) {
      if (err) {
        return console.error(err)
      }
      res.send(200);
    });
  }
};