angular.module('indexCards.controllers').controller('SearchCtrl', ['$scope', '$rootScope', '$routeParams', 'Words', 'Profile', 'Set', 'Cards', 

function($scope, $rootScope, $routeParams, Words, Profile, Set, Cards) {

  var init = function () {
    $scope.uid = $routeParams.id;
    $scope.setid = $routeParams.setid;

    getProfile();
    getSet();
    getCards();
  };

  $scope.createCard = function() {
    Cards.create($scope.term, $scope.definition);
    getSet();
  };

  $scope.addCard = function(term, def) {
    $scope.term = term;
    $scope.definition = def;
    $scope.createCard();
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

  var getProfile = function() {
    $scope.profile = Profile.get($scope.uid);
  };

  var getSet = function() {
    $scope.set = Set.get($scope.uid, $scope.setid);
  };

  var getCards = function() {
    $scope.cards = Cards.get($scope.uid, $scope.setid);
  };

  init();
}]);
