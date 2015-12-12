var md5 = require('md5');
var data = require('./Data.js');

var users = {
  'test_rep' : 'test_password',
  'test2' : 'pass',
  'test3' : 'pass'
};


function _genAuthToken(username, password) {
  return md5(username + ':' + password);
}

function _genHelpeeAuthToken() {
  return md5(Math.random())
}

module.exports = {
  genAuthToken: function(username, password) {
    var token;
	var isRep = users[username] && users[username] === password;
    if (isRep) {
      token = _genAuthToken(username, password); 
    } else {
	  token = _genHelpeeAuthToken();
	  username = undefined;
	}

	data.tokens.push({repName: username, token: token});

    data.active_sessions[token] = username;
    return token;
  }
} 
