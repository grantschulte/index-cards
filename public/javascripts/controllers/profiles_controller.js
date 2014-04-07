angular.module('indexCards.controllers').controller('ProfilesCtrl', ['$scope', '$rootScope', '$firebase', '$routeParams', 'loginService', 'firebaseRef',

function($scope, $rootScope, $firebase, $routeParams, loginService, firebaseRef) {

  var init = function () {
    getProfile();
  }

  $scope.createSet = function() {
    if (!$scope.set) { return false; }

    $scope.sets.$add({
      name: $scope.set,
      cards: false
    }).then(
      function( set ) {
        $scope.set = '';
      },
      function(err) {
        console.error('Login failed: ', err);
      }
    );
  };

  $scope.deleteSet = function(id) {
    $scope.sets.$remove(id);
  };

  var getProfile = function () {
    var userRef = firebaseRef('users/' + $routeParams.id);
    $scope.user = $firebase(userRef);
    $scope.sets = $scope.user.$child('sets');
  };

  init();
}]);