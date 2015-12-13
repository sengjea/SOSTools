var SOSEvents = require('../SOSEvents.js');
var Server = require('../Server.js');

var UserServer = function() {
  this._localStorageKey = 'userAuthToken';
};
UserServer.prototype = new Server();
UserServer._instance = new UserServer();

UserServer.getInstance = function() {
  return UserServer._instance;
}

module.exports = UserServer;
