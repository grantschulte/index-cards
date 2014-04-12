angular.module('indexCards.controllers').controller('EditSetCtrl', ['$scope', '$rootScope', '$routeParams', 'Profile', 'Set', 'Cards',  

function($scope, $rootScope, $routeParams, Profile, Set, Cards) {

  var init = function () {
    $scope.uid = $routeParams.id;
    $scope.setid = $routeParams.setid;

    getProfile();
    getSet();
    getCards();
  };

  $scope.deleteCard = function(id) {
    Cards.remove(id);
  };

  $scope.editSetName = function() {
    Set.rename($scope.set.name);
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
