function ProfilesController( $scope, $rootScope, $firebase, $location, $routeParams, FBURL, loginService ) {

  var init = function () {
    getProfile();
  }

  $scope.createSet = function () {
    $scope.sets.$add({
      name: $scope.set,
      cards: false
    }).then(
      function( set ) {
        $scope.set = '';
      },
      function ( err ) {
        console.error( 'Login failed: ', err );
      }
    );
  };

  $scope.deleteSet = function ( id ) {
    $scope.sets.$remove( id );
  };

  var getProfile = function () {
    var userRef = new Firebase( FBURL + 'users/' + $routeParams.id );
    $scope.user = $firebase( userRef );
    $scope.sets = $scope.user.$child('sets');
  };

  init();
};