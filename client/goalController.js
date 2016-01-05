var DEFAULT_GOAL_NAME = '';
var DEFAULT_GOAL_FREQ = 1;
var DEFAULT_GOAL_POINTS = 10;
var DEFAULT_GOAL_TIMES_DONE = 0;

angular.module('goal', ['services'])
.controller('goalCtrl', function($scope, $location, Goals, $routeParams) {
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
    if (!$routeParams.goal) {
      $scope.loadDefaults();
    }
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
    var currGoal = $scope.storage[$index];
  }
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
  }

  //get all goals
  $scope.getAll()
  .then(function() {
    //temp properties used in view to store info for the new goal
    if ($routeParams.goal) {
      $scope.loadFromParam();
    } else {
      $scope.loadDefaults();
    }
  });


});