function ProfilesController( $scope, $rootScope, $firebase, $firebaseSimpleLogin, $location, $routeParams, dbUrl ) {

  var init = function () {
    var authRef = new Firebase( dbUrl );
    $rootScope.auth = $firebaseSimpleLogin( authRef );

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

  $rootScope.logoutUser = function () {
    $rootScope.auth.$logout();
  };

  var getProfile = function () {
    var userRef = new Firebase( dbUrl + 'users/' + $routeParams.id );
    $scope.user = $firebase( userRef );
    $scope.sets = $scope.user.$child('sets');
  };

  $rootScope.$on("$firebaseSimpleLogin:logout", function ( e, user ) {
    $location.path( "/" );
  });

  init();
};