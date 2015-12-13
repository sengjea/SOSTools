var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');

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
AuthMessageProcessor.register('get_token', function(data, socket) {
  var authToken = auth.genAuthToken(data.name, data.password, socket);

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
AuthMessageProcessor.register('send_token', function(data, socket) {
	var token = data['token'];

	var updateSuccessful = data.updateSocket(token, socket);

	if (!updateSuccessful) {
		// The token wasn't found. Create a new one 
		// for a helpee.
		token = auth.genAuthToken(undefined, undefined, socket);
	}

	return {token: token};
});


module.exports = AuthMessageProcessor; 
