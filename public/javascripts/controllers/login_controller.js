function LoginController( $scope, $rootScope, $location, loginService ) {

  var init = function () {
    $scope.email = null;
    $scope.password = null;

    $scope.loading = false;
    $scope.showLogin = true;
    $scope.cardOn = false;
  };

  $scope.login = function ( cb ) {
    $scope.err = null;
    $scope.loading = true;

    if ( !$scope.email ) {
      $scope.err = 'Please enter an email address';
    }
    else if ( !$scope.password ) {
      $scope.err = 'Please enter a password';
    }
    else {
      loginService.login( $scope.email, $scope.password, function ( err, user ) {
        $scope.err = err? err + '' : null;
        if ( !err ) {
          cb && cb(user);
          $location.path( '/profile/' + user.id );
        } else {
          $scope.loading = false;
        }
      });
    }
  };

  $scope.createAccount = function () {
    $scope.err = null;
    $scope.loading = true;

    if ( assertValidLoginAttempt() ) {
      loginService.createAccount( $scope.email, $scope.password, function ( err, user ) {
        if( err ) {
          $scope.err = err? err + '' : null;
          $scope.loading = false;
        }
        else {
          $scope.login( function() {
            loginService.createProfile( user.id, user.email );
          });
        }
      });
    }
  };

  $scope.flipCard = function () {
    $scope.hideGuide = true;
    $scope.cardOn = !$scope.cardOn;
  };

  function assertValidLoginAttempt() {
    if ( !$scope.email ) {
      $scope.err = 'Please enter an email address';
    }
    else if ( !$scope.password ) {
      $scope.err = 'Please enter a password';
    }
    else if ( $scope.password !== $scope.confirm ) {
      $scope.err = 'Passwords do not match';
    }
    else if ( $scope.password.length < 6 ) {
      $scope.err = 'Password must have at least 6 characters';
    }
    return !$scope.err;
  }
  
  init();
};
