angular.module('indexCards.controllers').controller('SetsCtrl', ['$scope', '$rootScope', '$firebase', '$location', '$routeParams', 'Words', 'Set', 'User', 

function($scope, $rootScope, $firebase, $location, $routeParams, Words, Set, User) {

  var init = function() {
    getProfile();
    getCards();

    $scope.currentCard = 1;
    $scope.cardOn = false;
    $scope.scroll_left_px = 0;
    $scope.scroll_left = { left: $scope.scroll_left_px + 'px' };
    $scope.setId = $routeParams.setid;
    $scope.page = 'Search';
  };

  $scope.createCard = function() {
    Set.createCard($scope.term, $scope.definition);
    getCards();
    resetAddCards();
  };

  $scope.addCard = function(term, def) {
    $scope.term = term;
    $scope.definition = def;
    $scope.createCard();
  };

  $scope.deleteCard = function(id) {
    $scope.cards.$remove(id);
  };

  $scope.nextCard = function () {
    resetAddCards();

    if ($scope.currentCard === $scope.setLength) { return false; }
    
    $scope.scroll_left_px = $scope.scroll_left_px - 670;
    $scope.currentCard += 1;
    $scope.cardOn = false;
  };

  $scope.prevCard = function() {
    resetAddCards();

    if ($scope.currentCard === 1) { return false; }
    
    $scope.scroll_left_px = $scope.scroll_left_px + 670;
    $scope.currentCard -= 1;
    $scope.cardOn = false;
  };

  $scope.scrollLeft = function() {
    return { left: $scope.scroll_left_px + 'px' }
  };

  $scope.flipCard = function(id) {
    if (id + 1 === $scope.currentCard) { $scope.cardOn = !$scope.cardOn; }
  };

  $scope.toggleAddCards = function() {
    if (!$scope.setLength) { return false; }
    $scope.addCardsOpen = !$scope.addCardsOpen;
  };

  $scope.getWords = function() {
    var queryWord = $scope.word.toLowerCase();

    Words.query({ word: queryWord }).$promise.then(
      function(words) {
        $scope.wordList = words;
      },
      function(err) {
        console.error('Cannot find words: ', err);
      }
    );
  };

  $scope.editSetName = function() {
    Set.rename($scope.set.name);
  };

  var getProfile = function() {
    $scope.user = User.get($routeParams.id);
  };

  var getCards = function() {
    $scope.set = Set.get($routeParams.id, $routeParams.setid);
    $scope.cards = $scope.set.$child('cards');

    // Data loaded
    // $scope.cards.$on('loaded', function() {
    //   $scope.dataLoaded = true;
    // });

    // Gets length of set
    var cardSnapshot = Set.getCardSnapshot();
    
    cardSnapshot.once('value', function(snapshot) {
      $scope.setLength = snapshot.numChildren();
      setView();
    });
  };

  // Opens add cards template if set is empty
  var setView = function() {
    if (!$scope.setLength) { $scope.addCardsOpen = true; }
  };

  // Reset add cards template after card is created
  var resetAddCards = function() {
    $scope.addCardsOpen = false;
    $scope.term = '';
    $scope.definition = '';
  };

  init();
}]);