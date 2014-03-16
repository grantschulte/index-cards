function LoginController( $scope, $rootScope, $location, loginService ) {

  var init = function () {
    $scope.email = null;
    $scope.password = null;

    $scope.showLogin = true;
    $scope.cardOn = false;
  };

  $scope.login = function ( cb ) {
    $scope.err = null;

    if( !$scope.email ) {
      $scope.err = 'Please enter an email address';
    }
    else if( !$scope.password ) {
      $scope.err = 'Please enter a password';
    }
    else {
      loginService.login( $scope.email, $scope.password, function ( err, user ) {
        $scope.err = err? err + '' : null;
        if( !err ) {
          // $location.path( '/profile/' + user.id );
        }
      });
    }
  };

  $scope.createAccount = function () {
    $scope.err = null;

    if ( assertValidLoginAttempt() ) {
      loginService.createAccount( $scope.email, $scope.password, function ( err, user ) {
        if( err ) {
          $scope.err = err? err + '' : null;
        }
        else {
          $scope.login( function() {
            loginService.createProfile( user.id, user.email );
            $location.path( '/profile/' + user.id );
          });
        }
      });
    }
  };

  $scope.flipCard = function () {
    $scope.cardOn = !$scope.cardOn;
  };

  function assertValidLoginAttempt() {
    if( !$scope.email ) {
      $scope.err = 'Please enter an email address';
    }
    else if( !$scope.password ) {
      $scope.err = 'Please enter a password';
    }
    else if( $scope.password !== $scope.confirm ) {
      $scope.err = 'Passwords do not match';
    }
    return !$scope.err;
  }

  // $rootScope.$on("$firebaseSimpleLogin:login", function (e, user) {
  //   $location.path('/profile/' + user.id);
  // });

  // $rootScope.$on("$firebaseSimpleLogin:logout", function (e, user) {
  //   $location.path('/');
  // });
  
  init();
};
