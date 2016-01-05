angular.module('services', [])
.factory('Goals', function($http) {
  var add = function(goal) {
    console.log('adding or updating goal', goal);
    return $http({
      method: 'POST',
      url: '/goals',
      data: goal
    });
  };

  var getAll = function() {
    // console.log('getting all goals');
    return $http({
      method: 'GET',
      url: '/goals',
    });
  };

  var deleteOne = function(goalName) {
    return $http({
      method: 'DELETE',
      url: '/goal/' + goalName
    })
  };

  return {
    add: add,
    getAll: getAll,
    deleteOne: deleteOne
  };
});