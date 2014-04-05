
/*
 *  IndexCards - factories.js
 *  factories and resources
*/

angular.module('indexCards.factories', ['ngResource'])

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
}]);