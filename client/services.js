angular.module('services', [])
.factory('Goals', function($http) {
  var add = function(goal) {
    console.log('adding goal', goal);
    return $http({
      method: 'POST',
      url: '/goals',
      data: goal
    });
  };

  var update = function(goal) {
    console.log('updating goal', goal);
    return $http({
      method: 'POST',
      url: '/goal/' + goal._id,
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

  var getOne = function(goalId) {
    return $http({
      method: 'GET',
      url: '/goal/' + goalId
    })
  };

  var deleteOne = function(goalId) {
    return $http({
      method: 'DELETE',
      url: '/goal/' + goalId
    })
  };

  return {
    add: add,
    update: update,
    getAll: getAll,
    getOne: getOne,
    deleteOne: deleteOne
  };
})
.factory('Users', function($http) {
  var add = function(user) {
    console.log('adding or updating user', user);
    return $http({
      method: 'POST',
      url: '/users',
      data: user
    });
  };

  var getAll = function() {
    // console.log('getting all users');
    return $http({
      method: 'GET',
      url: '/users',
    });
  };

  var getOne = function(userName) {
    return $http({
      method: 'GET',
      url: '/user/' + userName
    })
  }

  var deleteOne = function(userName) {
    return $http({
      method: 'DELETE',
      url: '/user/' + userName
    })
  };

  return {
    add: add,
    getAll: getAll,
    getOne: getOne,
    deleteOne: deleteOne
  };
});