
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

// Set Factory
.factory('Set', ['FBURL', '$firebase', function(FBURL, $firebase) {
  var fbref  = null;
  var _ref   = null;

  return {
    get: function(uid, setid) {
      _uid = uid;
      _setid = setid;

      fbref = new Firebase(FBURL + 'users/' + uid + '/sets/' + setid);
      _ref = $firebase(fbref);
      return _ref;
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

// Sets Factory
.factory('Sets', ['FBURL', '$firebase', function(FBURL, $firebase) {
  var fbref = null;
  var _ref  = null;

  return {
    get: function(uid) {
      fbref = new Firebase(FBURL + 'users/' + uid + '/sets/');
      _ref = $firebase(fbref);
      return _ref;
    },
    create: function(set) {
      _ref.$add({
        name: set,
        cards: false,
        count: 0
      }).then(
        function(set) {
          console.log('Set created');
        },
        function(err) {
          console.error('Login failed: ', err);
        }
      );
    },
    remove: function(id) {
      _ref.$remove(id);
    }
  };
}])

// Cards Factory
.factory('Cards', ['FBURL', '$firebase', 'cardCount', function(FBURL, $firebase, cardCount) {
  var fbref  = null;
  var _ref   = null;
  var _uid   = null;
  var _setid = null;

  return {
    get: function(uid, setid) {
      _uid = uid;
      _setid = setid;

      fbref = new Firebase(FBURL + 'users/' + uid + '/sets/' + setid + '/cards');
      _ref = $firebase(fbref);
      return _ref;
    },
    create: function(term, def) {
      _ref.$add({
        term: term,
        definition: def
      }).then(
        function(card) {
          console.log('Success');
          cardCount.increment(_uid, _setid);
        },
        function(err) {
          console.log('Create Card Failure: ', err);
        }
      );
    },
    remove: function(id) {
      _ref.$remove(id);
      cardCount.decrement(_uid, _setid);
    }
  };
}])

// User Factory
.factory('Profile', ['FBURL', '$firebase', function(FBURL, $firebase) {
  return {
    get: function(uid) {
      return $firebase(new Firebase(FBURL + 'users/' + uid));
    }
  };
}]);