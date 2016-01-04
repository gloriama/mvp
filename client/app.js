angular.module('app', [])
.controller('goalCtrl', function($scope) {
  $scope.storage = [];
  $scope.add = function() {
    $scope.storage.push($scope.goal);
    $scope.goal = '';
  }
});