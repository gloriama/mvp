// var DEFAULT_TOTAL_POINTS = 0;

angular.module('user', ['services'])
.controller('userCtrl', function($scope, Users) {
  // $scope.username = '';
  // $scope.totalPoints = DEFAULT_TOTAL_POINTS;

  // $scope.updatePoints = function(newPoints) {
  //   $scope.totalPoints = newPoints;
  //   var user = {
  //     name: $scope.username,
  //     points: newPoints
  //   };
  // };

  // $scope.updatePoints();

  $scope.storage = [];

  $scope.loadUsers = function() {
    return Users.getAll()
    .then(function(resp) {
      var users = resp.data;
      console.log("all users:", users);
      $scope.storage = users;
    });
  };

  $scope.delete = function(id) {
    Users.deleteOne(id)
    .then(function() {
      $scope.loadUsers();
    });
  };

  $scope.loadUsers();
});