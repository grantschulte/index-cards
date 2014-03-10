
/*
 *	IndexCards - config.js
 *	angular settings and module definitions
*/

var indexCards = angular.module( 'indexCards', ['firebase', 'ngRoute'] );

// Firebase Url
indexCards.value( 'dbUrl', 'https://boiling-fire-4618.firebaseio.com/' );

// Routes
indexCards.config( function ( $routeProvider ) {
	$routeProvider

		.when( '/', {
			templateUrl : '../views/home.ejs'
		})
		.when( '/profile/:id', {
			templateUrl : '../views/profile.ejs'
		})
		.when( '/profile/:id/sets/:setid/edit', {
			templateUrl : '../views/edit.ejs'
		})
		.when( '/profile/:id/sets/:setid', {
			templateUrl : '../views/show.ejs'
		})
});
