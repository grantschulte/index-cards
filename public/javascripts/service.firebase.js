
/*
 *  IndexCards - service.firebase.js
 *  firebase reference service
*/

angular.module('indexCards.service.firebase', ['firebase'])

.factory('firebaseRef', ['Firebase', 'FBURL',
  function( Firebase, FBURL ) {
    return function( path ) {
      return new Firebase( pathRef( [FBURL].concat( Array.prototype.slice.call( arguments ) )));
    }
  }]);

function pathRef( args ) {
  for ( var i=0; i < args.length; i++ ) {
    if( typeof( args[i] ) === 'object' ) {
       args[i] = pathRef( args[i] );
    }
  }

  return args.join( '/' );
}