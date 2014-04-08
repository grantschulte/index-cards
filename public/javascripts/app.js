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

.run(function($rootScope){
  $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
      $rootScope.title = currentRoute.title;
  });
});

