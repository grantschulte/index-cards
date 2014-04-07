
/*
 *  IndexCards - routes.js
 *  global angular routes
*/

angular.module('indexCards.routes', ['ngRoute'])

// Routes
.config( function ($routeProvider) {
  $routeProvider

    .when( '/', {
      templateUrl : '../views/login.ejs'
    })
    .when( '/profile/:id', {
      authRequired: true,
      templateUrl : '../views/profile.ejs'
    })
    .when( '/profile/:id/sets/:setid/edit', {
      authRequired: true,
      templateUrl : '../views/edit.ejs'
    })
    .when( '/profile/:id/sets/:setid', {
      authRequired: true,
      templateUrl : '../views/cards.ejs'
    })
    .when( '/profile/:id/sets/:setid/search', {
      authRequired: true,
      templateUrl : '../views/search.ejs'
    })
});