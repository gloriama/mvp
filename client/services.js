angular.module('services', [])
.factory('Goals', function($http) {
  var add =function(goal) {
    console.log('adding goal');
    return $http({
      method: 'POST',
      url: '/goals',
      data: goal
    });
  };

  return {
    add: add
  };
});