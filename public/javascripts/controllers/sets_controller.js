function SetsController( $scope, $rootScope, $firebase, $firebaseSimpleLogin, $location, $routeParams, dbUrl ) {

  var init = function () {
    var authRef = new Firebase( dbUrl );
    $rootScope.auth = $firebaseSimpleLogin( authRef );

    getProfile();
    getCards();

    $scope.current_card = 0;
    $scope.card_on = false;
    $scope.scroll_left_px = 0;
    $scope.scroll_left = { left: $scope.scroll_left_px + 'px' };

    $scope.addcards_open = false;
    $scope.set_id = $routeParams.setid;
  }

  $scope.createCard = function () {
    $scope.cards.$add({
      term: $scope.term,
      definition: $scope.definition
    }).then(
      function( card ) {
        getCards();
        resetAddCards();
      },
      function ( err ) {
        console.error( 'Create Card Failure: ', err );
      }
    );
  };

  $scope.deleteCard = function ( id ) {
    $scope.cards.$remove( id );
  };

  $scope.nextCard = function () {
    $scope.addcards_open = false;

    if ( $scope.current_card === $scope.set_length ) {
      return false
    }
    else {
      $scope.scroll_left_px = $scope.scroll_left_px - 670;
    }

    $scope.current_card += 1;
    $scope.card_on = false;
  };

  $scope.prevCard = function () {
    $scope.addcards_open = false;

    if ( $scope.current_card === 0 ) {
      return false
    }
    else {
      $scope.scroll_left_px = $scope.scroll_left_px + 670;
    }

    $scope.current_card -= 1;
    $scope.card_on = false;
  };

  $scope.scrollLeft = function () {
    return {
      left: $scope.scroll_left_px + 'px'
    }
  };

  $scope.flipCard = function ( id ) {
    if ( id === $scope.current_card ) {
      $scope.card_on = !$scope.card_on;
    }
  };

  $scope.openAddCards = function () {
    $scope.addcards_open = !$scope.addcards_open;
  };

  var getProfile = function () {
    var userRef = new Firebase( dbUrl + 'users/' + $routeParams.id );
    $scope.user = $firebase( userRef );
  };

  var getCards = function () {
    var setRef = new Firebase( dbUrl + 'users/' + $routeParams.id + '/sets/' + $routeParams.setid );
    var cardSnapshot = setRef.child('cards');

    $scope.set = $firebase( setRef );
    $scope.cards = $scope.set.$child('cards');

    // Gets length of set
    cardSnapshot.once('value', function ( snapshot ) {
      $scope.set_length = snapshot.numChildren() - 1;
    });
  };

  var resetAddCards = function () {
    $scope.addcards_open = false;
    $scope.term = '';
    $scope.definition = '';
  };

  $rootScope.logoutUser = function () {
    $rootScope.auth.$logout();
  };

  $rootScope.$on("$firebaseSimpleLogin:logout", function ( e, user ) {
    $location.path( "/" );
  });

  init();
};