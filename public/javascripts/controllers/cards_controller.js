angular.module('indexCards.controllers').controller('CardsCtrl', ['$scope', '$rootScope', '$routeParams', 'Words', 'Set', 'Profile', 'Cards',  

function($scope, $rootScope, $routeParams, Words, Set, Profile, Cards) {

  var init = function() {
    $scope.uid = $routeParams.id;
    $scope.setid = $routeParams.setid;

    getProfile();
    getSet();
    getCards();

    $scope.currentCard = 1;
    $scope.cardOn = false;
    $scope.scroll_left_px = 0;
    $scope.scroll_left = { left: $scope.scroll_left_px + 'px' };
  };

  $scope.createCard = function() {
    Cards.create($scope.term, $scope.definition);
    getSet();
    resetAddCards();
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

  var getProfile = function() {
    $scope.profile = Profile.get($routeParams.id);
  };

  var getSet = function() {
    $scope.set = Set.get($scope.uid, $scope.setid);

    // Gets length of set
    var cardSnapshot = Set.getCardSnapshot();
    
    cardSnapshot.once('value', function(snapshot) {
      $scope.setLength = snapshot.numChildren();
      setView();
    });
  };

  var getCards = function() {
    $scope.cards = Cards.get($scope.uid, $scope.setid);
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