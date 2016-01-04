var DEFAULT_GOAL_NAME = '';
var DEFAULT_GOAL_FREQ = 1;
var DEFAULT_GOAL_POINTS = 10;

angular.module('app', ['services'])
.controller('goalCtrl', function($scope, Goals) {
  //temp properties used in view to store info for the new goal
  $scope.goalName = DEFAULT_GOAL_NAME;
  $scope.goalFreq = DEFAULT_GOAL_FREQ;
  $scope.goalPoints = DEFAULT_GOAL_POINTS;

  //properties used more generally
  $scope.storage = [];
  $scope.add = function() {
    var goal = {
      name: $scope.goalName,
      freq: $scope.goalFreq,
      points: $scope.goalPoints
    };
    $scope.storage.push(goal); //update client storage
    Goals.add(goal); //send POST request to /goals

    //reset defaults for temp properties to appear in view
    $scope.goalName = DEFAULT_GOAL_NAME;
    $scope.goalFreq = DEFAULT_GOAL_FREQ;
    $scope.goalPoints = DEFAULT_GOAL_POINTS;
  };
});