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
  genAuthToken: function(username, password, socket) {
    var token;
	  var isRep = 
      !(username === undefined ||
        password === undefined ||
        !users[username] ||
        !users[username] === password);

    if (isRep) {
      token = _genAuthToken(username, password); 
    } else {
	    token = _genHelpeeAuthToken();
	    data.chats.push({ 
        chatID: data.newChatID(),
		    conversation: [], 
        tokens: [token]
      });
	  }

	  data.tokens.push({isRep: isRep, token: token, socket: socket});
    return token;
  }
} 
