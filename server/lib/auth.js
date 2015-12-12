var md5 = require('md5');

var users = {
  'test_rep' : 'test_password',
  'test2' : 'pass',
  'test3' : 'pass'
};

var active_sessions = {};
var _log = {};

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
  },
  log: _log
}
