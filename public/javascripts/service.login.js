
/*
 *  IndexCards - service.login.js
 *  service for login and profile functions
*/

angular.module('indexCards.service.login', ['firebase', 'indexCards.service.firebase'])

.factory('loginService', ['$rootScope', '$firebaseSimpleLogin', 'firebaseRef', 'profileCreator', '$timeout',
  function($rootScope, $firebaseSimpleLogin, firebaseRef, profileCreator, $timeout) {
     var auth = null;

     return {
        init: function() {
           return auth = $firebaseSimpleLogin(firebaseRef());
        },

        login: function(email, password, callback) {
          assertAuth();
          auth.$login('password', {
            email: email,
            password: password,
            rememberMe: true
          }).then(function(user) {
            if (callback) {
              callback(null, user);
            }
          }, callback);
        },

        logout: function() {
          assertAuth();
          auth.$logout();
        },

        changePassword: function(opts) {
          assertAuth();

          var cb = opts.callback || function() {};

          if (!opts.oldpass || !opts.newpass) {
            $timeout(function(){ cb('Please enter a password'); });
          }
          else if (opts.newpass !== opts.confirm) {
            $timeout(function() { cb('Passwords do not match'); });
          }
          else {
            auth.$changePassword(opts.email, opts.oldpass, opts.newpass).then( function() {
              cb && cb(null);
            }, cb);
          }
        },

        createAccount: function(email, password, callback) {
          assertAuth();
          auth.$createUser(email, password).then( function (user) {
            callback && callback(null, user)
          }, callback);
        },

        createProfile: profileCreator
     };

    function assertAuth() {
      if (auth === null) { throw new Error('Must call loginService.init() before using its methods'); }
    }
  }])

.factory('profileCreator', ['firebaseRef', '$timeout', function(firebaseRef, $timeout) {
  return function(id, email, callback) {
    firebaseRef( 'users/' + id ).set({
      email: email,
      id: id,
      sets: false
    }, function(err) {
      if (callback) {
        $timeout(function() {
          callback(err);
        });
      }
    });
  }
}]);