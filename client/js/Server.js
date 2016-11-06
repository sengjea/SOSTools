var SOSEvents = require('./SOSEvents.js');

function Server() {
  this._socket = null;
  this._token = null;
  this._instance = null;
  this._credentials = { username: null, password: null };
}

Server.prototype.isConnected = function() {
  console.log(this._socket);
  return this._socket.connected;
}

Server.prototype.getLocalStorageKey = function() {
  throw new Error('getLocalStorageKey must be implemented by a subclass');
}

Server.prototype.getCredentials = function() {
  return this._credentials;
}

Server.prototype.getToken = function() {
  return this._token;
}

Server.prototype.setCredentials = function(username, password) {
  this._credentials = {
    username: username,
    password: password
  };
}

Server.prototype.setupCoreListeners = function() {
  this._socket.on('connect', function() {
    SOSEvents.emit('socket_connected');
    this.authenticate();
  }.bind(this));

  this._socket.on('reauthentication_required', function() {
    console.log('Re-authentication required');
    delete global.localStorage[this.getLocalStorageKey()];
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

  var _onToken = function(data) {
    var token =  data[0].token;
    this._token = token;
    if (token) {
    	global.localStorage.setItem(this.getLocalStorageKey(), token);
    	SOSEvents.emit('authenticated', token);
    }
  }.bind(this);

  this._socket.on('get_token', function(data) {
    console.log('get_token fired: ' + data[0].token);
    _onToken(data);
  });

  this._socket.on('send_token', function(data) {
    console.log('send_token fired: ' + data[0].token);
    _onToken(data);
  });

  this._socket.on('get_own_chat_ids', function(data) {
    console.log('socket: get_own_chat_ids', JSON.stringify(data));
    SOSEvents.emit('own_chats_loaded', data);
  });

  this._socket.on('receive_message', function(data) {
    SOSEvents.emit('receive_message', data);
  });

  this._socket.on(
    'load_conversation',
    function(data) {
      SOSEvents.emit('conversation_loaded', data);
    }
  );
  this._socket.on(
    'start_conversation',
    function(data) {
      SOSEvents.emit('conversation_started', data);
    }
  );

};

Server.prototype.setupListeners = function() {
  // hm... ?
};

Server.prototype.getInstance = function() {
  return this._instance;
}

Server.prototype.connect = function() {
  var socket = io();
  this._socket = socket;
  this.setupCoreListeners();
  this.setupListeners();
}

Server.prototype.authenticate = function() {
  var localToken = global.localStorage.getItem(this.getLocalStorageKey());
  if (localToken) {
    console.log('Using locally stored auth token');
    this._token = localToken;
    // Make sure the server knows we're know who we are
    this._socket.send(
      'send_token',
      { token: this._token }
    );
    return;
  }
  var credentials = this.getCredentials();
  this._socket.send(
    'get_token',
    {
      name: credentials.username,
      password: credentials.password
    }
  );
};

Server.prototype.getOwnConversations = function() {
  this._socket.send('get_own_chat_ids', { token: this._token });
};
Server.prototype.StartConversation = () => {
  this._socket.send('start_conversation', { token: this._token });
};
Server.prototype.loadMessages = function(chatID) {
  this._socket.send(
    'load_conversation',
    {
      chatID: chatID,
      token: this._token
    }
  );
}

Server.prototype.sendMessage = function(chatID, messageBody) {
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
