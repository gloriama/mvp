var DEFAULT_GOAL_NAME = '';
var DEFAULT_GOAL_FREQ = 1;
var DEFAULT_GOAL_POINTS = 10;
var DEFAULT_GOAL_TIMES_DONE = 0;
var DEFAULT_GOAL_ID = -1;
var DEFAULT_TO_USE = '';
var DEFAULT_USER_NAME = 'gloria';
var DEFAULT_USER_ID = '568b6a2abd3b48712d3170c9';
var DEFAULT_USER_POINTS = 0;

angular.module('goal', ['services'])
.controller('goalCtrl', function($scope, $location, Goals, Users, $routeParams) {
  $scope.storage = [];
  $scope.toUse = DEFAULT_TO_USE;

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
    $scope.update(goal)
    .then(function() {
      $scope.updateUserPoints(goal.points);
    });
  };

  $scope.usePoints = function() {
    $scope.updateUserPoints(-$scope.toUse*100);
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

  $scope.calculatePoints = function() {
    return _.reduce($scope.storage, function(acc, goal) {
      return acc + (goal.points * goal.timesDone);
    }, 0);
  };

  $scope.getUserPoints = function() {
    Users.getOne($scope.userId)
    .then(function(resp) {
      var user = resp.data;
      if (user.points) { //if user exists
        $scope.userPoints = user.points;
      } else {
        $scope.userPoints = $scope.calculatePoints();
        Users.add({
          name: $scope.userName,
          points: $scope.userPoints
        });
      }
    });
  };

  $scope.updateUserPoints = function(changeToPoints) {
    console.log('adding', changeToPoints, 'to', $scope.userPoints);
    $scope.userPoints += changeToPoints;
    var user = {
      _id: $scope.userId,
      name: $scope.userName,
      points: $scope.userPoints
    };
    Users.update(user);
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

  //for collection:
  //load defaults
  //get all goals
  //get user

  //for individual
  //load from param

  if ($routeParams.goal) {
      $scope.loadFromParam();
  } else {
    $scope.userName = DEFAULT_USER_NAME;
    $scope.userId = DEFAULT_USER_ID;
    $scope.userPoints = DEFAULT_USER_POINTS;
    $scope.loadDefaults();
    $scope.getAll();
    $scope.getUserPoints();
  }


});