
/*
 *  IndexCards - service.cardCount.js
 *  service for counting cards in a set
*/

angular.module('indexCards.service.cardCount', ['firebase'])

.factory('cardCount', ['FBURL', '$firebase', function(FBURL, $firebase) {
  return {
    increment: function(uid, setid) {
      fbref = new Firebase(FBURL + 'users/' + uid + '/sets/' + setid);
      _ref  = $firebase(fbref);

      var count = _ref.$child('count');
      count.$transaction(function(currentCount) {
        if (!currentCount) { return 1 };
        if (currentCount < 0) { return };
        return currentCount + 1;
      });
    },
    decrement: function(uid, setid) {
      fbref = new Firebase(FBURL + 'users/' + uid + '/sets/' + setid);
      _ref = $firebase(fbref);

      var count = _ref.$child('count');
      count.$transaction(function(currentCount) {
        if (!currentCount) { return };
        if (currentCount > 0) { return currentCount - 1 };
      });
    }
  }
}]);