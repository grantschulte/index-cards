function SetsController( $scope, $rootScope, $firebase, $location, $routeParams, FBURL, $timeout, loginService ) {

  var init = function () {
    getProfile();
    getCards();
    setView();

    $scope.currentCard = 1;
    $scope.cardOn = false;
    $scope.scroll_left_px = 0;
    $scope.scroll_left = { left: $scope.scroll_left_px + 'px' };
    $scope.setId = $routeParams.setid;
  };

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
        console.log( 'Create Card Failure: ', err );
      }
    );
  };

  $scope.deleteCard = function (id) {
    $scope.cards.$remove( id );
  };

  $scope.nextCard = function () {
    $scope.addCardsOpen = false;

    if ( $scope.currentCard === $scope.setLength ) {
      return false
    }
    else {
      $scope.scroll_left_px = $scope.scroll_left_px - 670;
    }

    $scope.currentCard += 1;
    $scope.cardOn = false;
  };

  $scope.prevCard = function () {
    $scope.addCardsOpen = false;

    if ( $scope.currentCard === 1 ) {
      return false;
    }
    else {
      $scope.scroll_left_px = $scope.scroll_left_px + 670;
    }

    $scope.currentCard -= 1;
    $scope.cardOn = false;
  };

  $scope.scrollLeft = function () {
    return {
      left: $scope.scroll_left_px + 'px'
    }
  };

  $scope.flipCard = function (id) {
    if ( id + 1 === $scope.currentCard ) {
      $scope.cardOn = !$scope.cardOn;
    }
  };

  $scope.toggleAddCards = function () {
    $scope.addCardsOpen = !$scope.addCardsOpen;
  };

  var getProfile = function () {
    var userRef = new Firebase( FBURL + 'users/' + $routeParams.id );
    $scope.user = $firebase( userRef );
  };

  var getCards = function () {
    var setRef = new Firebase( FBURL + 'users/' + $routeParams.id + '/sets/' + $routeParams.setid );
    var cardSnapshot = setRef.child('cards');

    $scope.set = $firebase( setRef );
    $scope.cards = $scope.set.$child('cards');

    // Data loaded
    $scope.cards.$on( 'loaded', function () {
      console.log( 'Cardset Loaded' );
      $scope.dataLoaded = true;
    });

    // Gets length of set
    cardSnapshot.once('value', function ( snapshot ) {
      $scope.setLength = snapshot.numChildren();
    });
  };

  // Opens add cards template if set is empty
  var setView = function () {
    if ( $scope.setLength === 0 || $scope.setLength === undefined ) {
      $scope.addCardsOpen = true;
    }
  };

  // Reset add cards template after card is created
  var resetAddCards = function () {
    $scope.addCardsOpen = false;
    $scope.term = '';
    $scope.definition = '';
  };

  init();
};