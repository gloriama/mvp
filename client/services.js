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

  //export of this service: a function that returns all needed ajax callers
  return function(keyword) {
    var add = function(obj) {
      // console.log('adding goal', goal);
      return sendReq('POST', '/'+keyword, obj);
    };

    var getAll = function() {
      // console.log('getting all goals');
      return sendReq('GET', '/'+keyword+'s');
    };

    var getOne = function(id) {
      return sendReq('GET', '/'+keyword+'/' + id);
    };

    var update = function(obj) {
      // console.log('updating goal', goal);
      return sendReq('POST', '/'+keyword+'/' + obj._id, obj);
    };

    var deleteOne = function(id) {
      return sendReq('DELETE', '/'+keyword+'/' + id);
    };

    return {
      add: add,
      getAll: getAll,
      getOne: getOne,
      update: update,
      deleteOne: deleteOne
    };
  };
})
.factory('Goals', function(AJAX) {
  return AJAX('goal');
})
.factory('Users', function(AJAX) {
  return AJAX('user');
});