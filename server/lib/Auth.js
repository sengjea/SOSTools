var md5 = require('md5');
 
var AuthResponse = require('../lib/responses/AuthResponse.js');
var AuthException = require('../lib/responses/AuthException.js');

var users = {
  'test_rep' : 'test_password',
  'test2' : 'pass',
  'test3' : 'pass'
};


function _genAuthToken(username, password) {
  return md5(username + ':' + password);
}

function _genAnonymousToken() {
  var token = md5(Date.now());
  return token;
}

module.exports = {
  validateCredentials: function(username, password, socket) {
       if (username !== undefined &&
        password !== undefined &&
        users[username] && users[username] === password) {
	return _genAuthToken(username, password);
	} else { 
	return null;
	}
  },
  generateAnonymousToken: _genAnonymousToken,
  generateResponse: (token) => {
	return new AuthResponse(token ? token : _genAnonymousToken());
  }
} 
