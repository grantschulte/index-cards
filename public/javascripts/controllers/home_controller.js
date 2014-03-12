function HomeController( $scope ) {

   var init = function () {
    $scope.cardOn = false;
  }

  $scope.flipCard = function () {
    $scope.cardOn = !$scope.cardOn;
  };

};