
/*
 *  IndexCards - config.js
 *  angular settings and module definitions
*/

angular.module('indexCards.config', [] )

// angularFire version
.constant('version', '0.6')

// firebase url
.constant('FBURL', 'https://boiling-fire-4618.firebaseio.com/')

// wordnik api url
.constant('wordnikUrl', 'http://api.wordnik.com:80/v4/word.json')

// login redirect path
.constant('loginRedirectPath', '/')