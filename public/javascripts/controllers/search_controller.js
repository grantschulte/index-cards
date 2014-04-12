angular.module('indexCards.controllers').controller('SearchCtrl', ['$scope', '$rootScope', '$routeParams', 'Words', 'Profile', 'Set', 'Cards', 

function($scope, $rootScope, $routeParams, Words, Profile, Set, Cards) {

  var init = function () {
    $scope.uid = $routeParams.id;
    $scope.setid = $routeParams.setid;

    getProfile();
    getSet();
    getCards();

    $scope.loading = false;
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
    $scope.loading = true;
    
    var word = $scope.word.toLowerCase();
    Words.query({ word: word }).$promise.then(
      function(words) {
        $scope.wordList = words;
        $scope.loading = false;
      },
      function(err) {
        $scope.error = err;
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
