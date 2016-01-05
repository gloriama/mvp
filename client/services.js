angular.module('services', [])
.factory('AJAX', function($http) {
  //sends an ajax request via $http, returns response
  var sendReq = function(method, url, data) {
    var options = {
      method: method,
      url: url
    };
    if (data) {
      options.data = data;
    }
    return $http(options);
  };

  return {
    sendReq: sendReq
  };
})
.factory('Goals', function(AJAX) {
  var add = function(goal) {
    // console.log('adding goal', goal);
    return AJAX.sendReq('POST', '/goals', goal);
  };

  var getAll = function() {
    // console.log('getting all goals');
    return AJAX.sendReq('GET', '/goals');
  };

  var getOne = function(goalId) {
    return AJAX.sendReq('GET', '/goal/' + goalId);
  };

  var update = function(goal) {
    // console.log('updating goal', goal);
    return AJAX.sendReq('POST', '/goal/' + goal._id, goal);
  };

  var deleteOne = function(goalId) {
    return AJAX.sendReq('DELETE', '/goal/' + goalId);
  };

  return {
    add: add,
    getAll: getAll,
    getOne: getOne,
    update: update,
    deleteOne: deleteOne
  };
})
.factory('Users', function(AJAX) {
  var add = function(user) {
    // console.log('adding user', user);
    return AJAX.sendReq('POST', '/users', user);
  };

  var getAll = function() {
    // console.log('getting all users');
    return AJAX.sendReq('GET', '/users');
  };

  var getOne = function(userId) {
    return AJAX.sendReq('GET', '/user/' + userId);
  };

  var update = function(user) {
    // console.log('updating user', user);
    return AJAX.sendReq('POST', '/user/' + user._id, user);
  };

  var deleteOne = function(userId) {
    return AJAX.sendReq('DELETE', '/user/' + userId);
  };

  return {
    add: add,
    getAll: getAll,
    getOne: getOne,
    update: update,
    deleteOne: deleteOne
  };
})