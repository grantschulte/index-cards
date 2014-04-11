angular.module('indexCards.controllers').controller('ProfilesCtrl', ['$scope', '$rootScope', '$firebase', '$routeParams', 'loginService', 'User', 'Sets',

function($scope, $rootScope, $firebase, $routeParams, loginService, User, Sets) {

  var init = function () {
    getProfile();
  }

  $scope.createSet = function() {
    if (!$scope.set) { return false; }
    Sets.createSet($scope.set);
    $scope.set = '';
  };

  $scope.deleteSet = function(id) {
    Sets.remove(id);
  };

  var getProfile = function () {
    var uid = $routeParams.id;
    $scope.user = User.get(uid);
    $scope.sets = Sets.get(uid);
  };

  init();
}]);