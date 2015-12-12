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
 */
AuthMessageProcessor.register('get_token', function(data) {

  var authToken = auth.genAuthToken(data.name, data.password);

  return {token: authToken};
});

module.exports = AuthMessageProcessor; 
