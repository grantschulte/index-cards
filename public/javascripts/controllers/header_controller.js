function HeaderCtrl( $scope, $rootScope, $location, loginService ) {

  $scope.logout = function () {
    loginService.logout();
  };
}