
/*
 *  IndexCards - routes.js
 *  global angular routes
*/

angular.module('indexCards.routes', ['ngRoute'])

// Routes
.config(function($routeProvider) {
  $routeProvider

    .when( '/', {
      templateUrl : '../views/login.ejs'
    })
    .when( '/profile/:id', {
      authRequired: true,
      templateUrl : '../views/profile.ejs',
      title: 'Profile'
    })
    .when( '/profile/:id/sets/:setid/edit', {
      authRequired: true,
      templateUrl : '../views/edit.ejs',
      title: 'Edit'
    })
    .when( '/profile/:id/sets/:setid', {
      authRequired: true,
      templateUrl : '../views/cards.ejs',
      title: 'Cards'
    })
    .when( '/profile/:id/sets/:setid/search', {
      authRequired: true,
      templateUrl : '../views/search.ejs',
      title: 'Search'
    })
})

.run(function($rootScope) {
  $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
    $rootScope.title = currentRoute.title;
  });
});