var SOSEvents = require('./SOSEvents.js');

function Server() {
  this._socket = null;
  this._token = null;
  this._instance = null;
}

Server.prototype.setupListeners = function() {
  // hm... ? 
};

Server.prototype.getInstance = function() {
  return this._instance;
}

Server.prototype.connect = function() {
  var socket = io('ws://localhost:8887');
  this._socket = socket;
  this.setupListeners();
}

Server.prototype.authenticate = function(username, password) {
  if (window.localStorage.authToken) {
    console.log('Using locally stored auth token');
    SOSEvents.emit('authenticated', window.localStorage.authToken);
    this._token = window.localStorage.authToken;
    
    // Make sure the server knows we're know who we are
    this._socket.send(
      'send_token',
      { token: this._token }
    );
    return;
  }
  this._socket.send(
    'get_token', 
    { 
      name: username, 
      password: password
    }
  );
};

Server.prototype.sendMessage = function(conversationID, messageBody) {
  this._socket.send(
    'send_message',
    {
      chatID : chatID,
      message: messageBody,
      senderToken: Server._token
    }
  );
};

module.exports = Server;
