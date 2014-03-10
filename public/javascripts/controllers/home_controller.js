function HomeController( $scope ) {

	 var init = function () {
		$scope.current_card = 0;
    $scope.card_on = false;
  }

	$scope.flipCard = function () {
    $scope.card_on = !$scope.card_on;
  };

};