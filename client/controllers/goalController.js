var DEFAULT_GOAL_NAME = '';
var DEFAULT_GOAL_FREQ = 1;
var DEFAULT_GOAL_POINTS = 10;
var DEFAULT_GOAL_TIMES_DONE = 0;
var DEFAULT_TO_USE = 0;

angular.module('goal', ['services'])
.controller('goalCtrl', function($scope, $location, Goals, Users, $routeParams) {
  $scope.storage = [];
  $scope.toUse = DEFAULT_TO_USE;
  $scope.username = 'gloria';

  $scope.add = function(goal) {
    //goal is optional: will default to the info in the $scope properties
    goal = goal || {
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

  $scope.redirectToUpdate = function($index) {
    $location.path('/goal/' + $index);
  };

  $scope.delete = function($index) {
    var currGoal = $scope.storage[$index];
    Goals.deleteOne(currGoal.name)
    .then(function() {
      $scope.getAll();
    });
  };

  $scope.getAll = function() {
    return Goals.getAll()
    .then(function(resp) {
      var goals = resp.data;
      //console.log(goals);
      $scope.storage = goals;
    });
  };

  $scope.incrementTimesDone = function($index) {
    var goal = $scope.storage[$index];
    goal.timesDone++;
    $scope.add(goal)
    .then(function() {
      $scope.updateTotalPoints(goal.points);
    });
  };

  $scope.use = function() {
    $scope.updateTotalPoints(-$scope.toUse);
    $scope.toUse = DEFAULT_TO_USE;
  };

  $scope.loadDefaults = function() {
    $scope.goalName = DEFAULT_GOAL_NAME;
    $scope.goalFreq = DEFAULT_GOAL_FREQ;
    $scope.goalPoints = DEFAULT_GOAL_POINTS;
  };

  $scope.loadFromParam = function() {
    //console.log($scope.storage);
    var currGoal = $scope.storage[$routeParams.goal];
    $scope.goalName = currGoal.name;
    $scope.goalFreq = currGoal.freq;
    $scope.goalPoints = currGoal.points;
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