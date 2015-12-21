var MessageProcessor = require('./MessageProcessor.js');
var Auth = require('../lib/Auth.js');
var Data = require('../lib/Data.js');

var AuthMessageProcessor = new MessageProcessor();

/*
 * Takes an optional 'username' and 'password'. 
 *
 * If the username and password are correct
 * a Rep is verified.
 *
 * In the case that no username and password are 
 * specified, or in the case that the username
 * and password are wrong, the user is 
 * entered as a helpee.
 *
 * The returned object is of the form {token: "...."}
 */
AuthMessageProcessor.register('get_token', function(params, socket) {
  var authToken = Auth.genAuthToken(params.name, params.password, socket);

  return {token: authToken};
}); 

/*
 * In this case, the user already has a token.
 *
 * Update the socket for that token.
 *
 * The token should be attached under ('token').
 *
 * It sends back a (potentiatlly new!) token. This is in the case
 * that the passed token could not be found.
 */
AuthMessageProcessor.register('send_token', function(params, socket) {
	var token = params['token'];

	var updateSuccessful = Data.updateSocket(token, socket);

	if (!updateSuccessful && !token) {
		// The token wasn't found. Create a new one 
		// for a helpee.
		token = Auth.genAuthToken(undefined, undefined, socket);
	} else if (!updateSuccessful) {
    // If we're here, we've lost what the token meant and can't 
    // ensure we give the client back its proper privilegeds. 
    // So, let's force them to reauth.
    socket.emit('reauthentication_required');
    return { error: 'Reauthentication required.' }  
  }

	return {token: token};
});


module.exports = AuthMessageProcessor; 
