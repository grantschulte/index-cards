angular.module('indexCards.controllers').controller('ProfileCtrl', ['$scope', '$rootScope', '$routeParams', 'Profile', 'Sets',

function($scope, $rootScope, $routeParams, Profile, Sets) {

  var init = function () {
    $scope.uid = $routeParams.id;
    getProfile();
    getSets();
  }

  $scope.createSet = function() {
    if (!$scope.setname) { return false; }
    Sets.create($scope.setname);
    $scope.setname = '';
  };

  $scope.deleteSet = function(id) {
    Sets.remove(id);
  };

  var getProfile = function() {
    $scope.profile = Profile.get($scope.uid);
  };

  var getSets = function() {
    $scope.sets = Sets.get($scope.uid);
  };

  init();
}]);