angular.module('indexCards.controllers').controller('HeaderCtrl', ['$scope', '$rootScope', '$location', 'loginService',

function($scope, $rootScope, $location, loginService) {

  var init = function () {
    $scope.ctrlOpen = false;
  };

  $scope.logout = function () {
    loginService.logout();
  };

  $scope.toggleCtrl = function () {
    $scope.ctrlOpen = !$scope.ctrlOpen;
  };

  init();
}]);