var DEFAULT_TOTAL_POINTS = 0;

app.module('user', ['services'])
.controller('userCtrl', function($scope, Users) {
  $scope.username = '';
  $scope.totalPoints = DEFAULT_TOTAL_POINTS;

  $scope.updatePoints = function(newPoints) {
    $scope.totalPoints = newPoints;
    var user = {
      name: $scope.username,
      points: newPoints
    };
    Users.add(user);
  };

  $scope.updatePoints();
});