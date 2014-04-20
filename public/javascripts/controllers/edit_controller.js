angular.module('indexCards.controllers').controller('EditSetCtrl', ['$scope', '$rootScope', '$routeParams', 'Profile', 'Set', 'Cards',  

function($scope, $rootScope, $routeParams, Profile, Set, Cards) {

  var init = function () {
    $scope.uid = $routeParams.id;
    $scope.setid = $routeParams.setid;
    $scope.renameActive = false;

    getProfile();
    getSet();
    getCards();
  };

  $scope.deleteCard = function(id) {
    Cards.remove(id);
  };

  $scope.editSetName = function() {
    Set.rename($scope.set.name);
    $scope.renameActive = false;
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

  $scope.$watch('set.name', function(newName, oldName) {
    if (!newName || !oldName) { return; }
    $scope.renameActive = true;
  });

  init();
}]);
