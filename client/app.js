angular.module('app', ['services', 'goal', 'ngRoute'])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'goals.html',
    controller: 'goalCtrl'
  })
  .when('/goals', {
    templateUrl: 'goals.html',
    controller: 'goalCtrl'
  })
  .when('/goal/:goal', {
    templateUrl: 'goal.html',
    controller: 'goalCtrl'
  })
});
