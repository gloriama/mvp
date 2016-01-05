var DEFAULT_GOAL_NAME = '';
var DEFAULT_GOAL_FREQ = 1;
var DEFAULT_GOAL_POINTS = 10;
var DEFAULT_GOAL_TIMES_DONE = 0;

angular.module('goal', ['services'])
.controller('goalCtrl', function($scope, $location, Goals) {
  //temp properties used in view to store info for the new goal
  $scope.goalName = DEFAULT_GOAL_NAME;
  $scope.goalFreq = DEFAULT_GOAL_FREQ;
  $scope.goalPoints = DEFAULT_GOAL_POINTS;

  $scope.storage = [];

  $scope.add = function() {
    var goal = {
      name: $scope.goalName,
      freq: $scope.goalFreq,
      points: $scope.goalPoints,
      timesDone: DEFAULT_GOAL_TIMES_DONE
    };

    //update client storage
    $scope.storage.push(goal);

    Goals.add(goal) //send POST request to /goals
    .then(function() {
      $scope.getAll();
    });

    //reset defaults for temp properties to appear in view
    $scope.goalName = DEFAULT_GOAL_NAME;
    $scope.goalFreq = DEFAULT_GOAL_FREQ;
    $scope.goalPoints = DEFAULT_GOAL_POINTS;
  };

  $scope.update = function() {
    console.log('redirecting to goal page');
    $location.path('/goal');
  }

  $scope.getAll = function() {
    Goals.getAll()
    .then(function(resp) {
      var goals = resp.data;
      console.log(goals);
      $scope.storage = goals;
    });
  };

  //get all goals
  $scope.getAll();

});