var md5 = require('md5');
 
var AuthResponse = require('../lib/responses/AuthResponse.js');
var AuthResponse = require('../lib/responses/AuthException.js');

var users = {
  'test_rep' : 'test_password',
  'test2' : 'pass',
  'test3' : 'pass'
};


function _genAuthToken(username, password) {
  return md5(username + ':' + password);
}

function _genAnonymousToken() {
  return md5(Date.now());
}

module.exports = {
  validateCredentials: function(username, password, socket) {
	  var isRep = 
      !(username === undefined ||
        password === undefined ||
        !users[username] ||
        !users[username] === password);
    if (!isRep) {
      return new AuthException('User not found'); 
    } 
    return new AuthResponse(_genAuthToken(username, password));
  },
  generateAnonymousToken: function() {
    return new AuthResponse(_genAnonymousToken());
  }
} 
