var DEFAULT_GOAL_NAME = '';
var DEFAULT_GOAL_FREQ = 1;
var DEFAULT_GOAL_POINTS = 10;
var DEFAULT_GOAL_TIMES_DONE = 0;
var DEFAULT_GOAL_ID = -1;
var DEFAULT_TO_USE = 0;

angular.module('goal', ['services'])
.controller('goalCtrl', function($scope, $location, Goals, Users, $routeParams) {
  $scope.storage = [];
  $scope.toUse = DEFAULT_TO_USE;
  $scope.username = 'gloria';

  // ---- Collection Page ----
  $scope.add = function() {
    var goal = {
      name: $scope.goalName,
      freq: $scope.goalFreq,
      points: $scope.goalPoints,
      timesDone: DEFAULT_GOAL_TIMES_DONE
    };

    return Goals.add(goal) //send POST request to /goals
    .then(function() {
      $scope.getAll();

      //reset defaults for temp properties to appear in view
      if (!$routeParams.goal) {
        $scope.loadDefaults();
      }
    });
  };

  $scope.getAll = function() {
    return Goals.getAll()
    .then(function(resp) {
      var goals = resp.data;
      console.log(goals);
      $scope.storage = goals;
    });
  };

  $scope.incrementTimesDone = function($index) {
    var goal = $scope.storage[$index];
    goal.timesDone++;
    console.log("goal just incremented", goal);
    $scope.update(goal)
    .then(function() {
      $scope.updateTotalPoints(goal.points);
    });
  };

  $scope.use = function() {
    $scope.updateTotalPoints(-$scope.toUse*100);
    $scope.toUse = DEFAULT_TO_USE;
  };

  $scope.redirectToIndividual = function(goalId) {
    $location.path('/goal/' + goalId);
  };

  $scope.redirectToCollection = function() {
    $location.path('/goals');
  }

  $scope.delete = function(goalId) {
    Goals.deleteOne(goalId)
    .then(function() {
      $scope.getAll();
    });
  };

  $scope.updateTotalPoints = function(changeToPoints) {
    // $scope.totalPoints = _.reduce($scope.storage, function(acc, goal) {
    //   return acc + (goal.points * goal.timesDone);
    // }, 0);
  
    //if changeToPoints is blank, then query server for points

    if (changeToPoints === undefined) {
      Users.getOne($scope.username)
      .then(function(resp) {
        var user = resp.data;
        console.log(user);
        if (user.points) { //if user existed
          $scope.totalPoints = user.points;
        } else {
          $scope.totalPoints = _.reduce($scope.storage, function(acc, goal) {
            return acc + (goal.points * goal.timesDone);
          }, 0);
          Users.add({
            name: $scope.username,
            points: $scope.totalPoints
          });
        }
      });
    } else {
      $scope.totalPoints += changeToPoints;
      var user = {
        name: $scope.username,
        points: $scope.totalPoints
      };
      Users.add(user);
    }
  };

  //collection and individual page
  $scope.update = function(goal) {
    goal = goal || {
      name: $scope.goalName,
      freq: $scope.goalFreq,
      points: $scope.goalPoints,
      timesDone: $scope.goalTimesDone || DEFAULT_GOAL_TIMES_DONE,
      _id: $scope.goalId
    };

    return Goals.update(goal)
    .then(function() {
      $scope.getAll();
      //reset defaults for temp properties to appear in view
      if (!$routeParams.goal) {
        $scope.loadDefaults();
      }
    });
  };

  $scope.loadDefaults = function() {
    $scope.goalName = DEFAULT_GOAL_NAME;
    $scope.goalFreq = DEFAULT_GOAL_FREQ;
    $scope.goalPoints = DEFAULT_GOAL_POINTS;
    $scope.goalId = DEFAULT_GOAL_ID;
  };

  $scope.loadFromParam = function() {
    //console.log($scope.storage);
    Goals.getOne($routeParams.goal)
    .then(function(resp) {
      var currGoal = resp.data;
      $scope.goalName = currGoal.name;
      $scope.goalFreq = currGoal.freq;
      $scope.goalPoints = currGoal.points;
      $scope.goalId = currGoal._id;
      $scope.goalTimesDone = currGoal.timesDone;
    });
  };

  //get all goals
  $scope.getAll()
  .then(function() {
    //temp properties used in view to store info for the new goal
    if ($routeParams.goal) {
      $scope.loadFromParam();
    } else {
      $scope.loadDefaults();
    }
    $scope.updateTotalPoints();
  });


});