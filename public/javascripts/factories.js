
/*
 *  IndexCards - factories.js
 *  factories and resources
*/

angular.module('indexCards.factories', ['ngResource'])

// Words Factory
.factory('Words', ['$resource','wordnikUrl', function($resource, wordnikUrl) {
  return $resource( wordnikUrl + '/:word/:type', {
    word : '@word',
    type : 'definitions',
    limit : 5,
    includeRelated : true,
    sourceDictionaries : 'all',
    useCanonical : false,
    includeTags : false,
    api_key : 'c5514170aa3ba04d9f1da262f5a002a7ecf3a89b5133cd5ad'
  });
}])

// Sets Factory
.factory('Set', ['FBURL', '$firebase', function(FBURL, $firebase) {
  var fbref = null;
  var _ref = null;

  return {
    get: function(uid, setid) {
      fbref = new Firebase(FBURL + 'users/' + uid + '/sets/' + setid);
      _ref = $firebase(fbref);
      return _ref;
    },

    getCardSnapshot: function() {
      return fbref.child('cards');
    },

    createCard: function(term, def) {
      var cards = _ref.$child('cards');

      cards.$add({
        term: term,
        definition: def
      }).then(
        function(card) {
          console.log('Success');
        },
        function(err) {
          console.log('Create Card Failure: ', err);
        }
      );
    },

    rename: function(name) {
      _ref.$update({
        name: name
      }).then(
        function() {
          console.log('Rename Successful');
        },
        function(err) {
          console.error('Rename Failed: ', err);
        }
      );
    }
  };
}])

// User Factory
.factory('User', ['FBURL', '$firebase', function(FBURL, $firebase) {
  return {
    get: function(uid) {
      return $firebase(new Firebase(FBURL + 'users/' + uid));
    }
  };
}]);