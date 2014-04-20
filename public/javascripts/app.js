angular.module('indexCards', [
  'indexCards.config', 
  'indexCards.services', 
  'indexCards.controllers', 
  'indexCards.routes', 
  'indexCards.factories', 
  'simpleLoginTools', 
  'routeSecurity'
])

.run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
  if (FBURL === 'https://INSTANCE.firebaseio.com') {
    angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
    setTimeout(function() {
      angular.element(document.body).removeClass('hide');
    }, 250);
  }
  else {
    $rootScope.auth = loginService.init('/');
    $rootScope.FBURL = FBURL;
  }
}])

.run(function($rootScope, $location){
  $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
      if ($location.$$path === '/') {
        $rootScope.title = 'IndexCards v1 - Create index card sets to study topics or enhance your vocabulary.';
      }
      else {
        $rootScope.title = 'IndexCards v1 - ' + currentRoute.title;
      }
  });
});

