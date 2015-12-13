var SOSEvents = require('../SOSEvents.js');
var Server = require('../Server.js');

var UserServer = function() {};
UserServer.prototype = new Server();
UserServer._instance = new UserServer();
UserServer.prototype.getLocalStorageKey = function() {
  return 'userAuthToken';
};

UserServer.getInstance = function() {
  return UserServer._instance;
}

module.exports = UserServer;
