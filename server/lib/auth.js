var md5 = require('md5');

var users = {
  'test_rep' : 'test_password',
};

var active_sessions = {};

function _genAuthToken(username, password) {
  return md5(username + ':' + password);
}

module.exports = {
  genAuthToken: function(username, password) {
    var token;
    if (users[username] && users[username] === password) {
      token = _genAuthToken(username, password); 
      active_sessions[token] = username;
      return token;
    } 
    return false;
  }
}
