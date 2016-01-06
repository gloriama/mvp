angular.module('app', ['services', 'goal', 'user', 'ngRoute'])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/goals', {
    templateUrl: 'views/goals.html',
    controller: 'goalCtrl'
  })
  .when('/goal/:goal', {
    templateUrl: 'views/goal.html',
    controller: 'goalCtrl'
  })
  .when('/users', {
    templateUrl: 'views/users.html',
    controller: 'userCtrl'
  })
  .otherwise({
    redirectTo: '/goals'
  });
});
