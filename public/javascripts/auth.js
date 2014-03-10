function AuthController( $scope, $rootScope, $location, $firebase, $firebaseSimpleLogin, dbUrl ) {

  var usersRef = new Firebase( dbUrl );
  $rootScope.auth = $firebaseSimpleLogin( usersRef );

  $scope.init = function () {
    $rootScope.showLogin = true;
  };

  $scope.loginUser = function () {
    $rootScope.auth.$login('password', {
      email: $scope.email,
      password: $scope.password,
      rememberMe: true
    }).then(
      function ( user ) {
        $scope.current_user = user;
      },
      function ( err ) {
        console.error( 'Login failed: ', err );
      }
    );
  };

  $scope.createNewUser = function () {
    $rootScope.auth.$createUser(
      $scope.email, $scope.password
    ).then(

    // login user
    function ( user ) {
      $rootScope.auth.$login('password', {
        email: $scope.email,
        password: $scope.password
      }).then(

      // create profile
      function ( user ) {
        new Firebase( dbUrl )
        .child( 'users/' + user.id )
        .set({
          email: user.email,
          id: user.id,
          sets: false
        },

        // create profile error
        function ( err ) {
          $scope.error = err;
        });
      }, 

      // login error
      function ( err ) {
        $scope.error = err;
      });
    },

    // create user error
    function ( err ) {
      console.error( 'Create failed: ', err );
    });
  };

  $rootScope.logoutUser = function () {
    $rootScope.auth.$logout();
  };

  $rootScope.$on("$firebaseSimpleLogin:login", function ( e, user ) {
    console.log( 'User ' + user.id + ' successfully logged in!');
    $location.path( "/profile/" + user.id );
  });

  $rootScope.$on("$firebaseSimpleLogin:logout", function ( e, user ) {
    $location.path( "/" );
  });

  $scope.init();

};