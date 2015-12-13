var SOSEvents = require('./SOSEvents.js');

function Server() {
  this._socket = null;
  this._token = null;
  this._instance = null;
  this._localStorageKey = null;
}

Server.prototype.setupCoreListeners = function() {
    this._socket.on('connect', function() {
    SOSEvents.emit('socket_connected');
    this.authenticate();
  }.bind(this));

  this._socket.on('message', function(data){
    SOSEvents.emit('message', data);
  });

  this._socket.on('disconnect', function(){
    SOSEvents.emit('socket_disconnected');
  });

  this._socket.on('error', function() {
    console.log('error');
    SOSEvents.emit('socket_error');
  });

  function _onToken(data) { 
    console.log('get_token received');
    console.log(data);
    var token =  data[0].token;
    this._token = token;
    global.localStorage.setItem(this._localStorageKey, token);
    SOSEvents.emit('authenticated', token);
  }

  this._socket.on('get_token', function(data) {
    _onToken(data);
  });

  this._socket.on('send_token', function(data) {
    _onToken(data);
  });
};

Server.prototype.setupListeners = function() {
  // hm... ? 
};

Server.prototype.getInstance = function() {
  return this._instance;
}

Server.prototype.connect = function() {
  var socket = io('ws://localhost:8887');
  this._socket = socket;
  this.setupCoreListeners();
  this.setupListeners();
}

Server.prototype.authenticate = function(username, password) {
  var localToken = window.localStorage.getItem(this._localStorageKey);
  if (localToken) {
    console.log('Using locally stored auth token');
    SOSEvents.emit('authenticated', localToken);
    this._token = localToken;
    
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
      sender_token: this._token
    }
  );
};

module.exports = Server;
