angular.module('services', [])
.factory('Goals', function($http) {
  var add = function(goal) {
    console.log('adding goal');
    return $http({
      method: 'POST',
      url: '/goals',
      data: goal
    });
  };

  var getAll = function() {
    console.log('getting all goals');
    return $http({
      method: 'GET',
      url: '/goals',
    });
  }

  return {
    add: add,
    getAll: getAll
  };
});