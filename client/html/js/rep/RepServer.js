var SOSEvents = require('../SOSEvents.js');
var Server = require('../Server.js');

var RepServer = function() {};

RepServer.prototype = new Server();
RepServer._instance = new RepServer();

RepServer.getInstance = function() {
  return RepServer._instance;
}

RepServer.prototype.getLocalStorageKey = function() {
  return 'repAuthToken';
};

// TODO: Add validation to each of these, emit error cases
RepServer.prototype.setupListeners = function() {
  this._socket.on('get_own_chat_ids', function(data) {
    SOSEvents.emit('own_chats_loaded', data);
  });

  this._socket.on('join_conversation', function(data) {
    console.log('conversation joined');
    console.log(data);
    SOSEvents.emit('conversation_joined', data);
  });

  this._socket.on('get_other_chat_ids', function(data) {
    console.log('chats loaded');
    console.log(data);
    SOSEvents.emit('conversations_loaded', data);
  });

  this._socket.on('receive_message', function(data) {
    SOSEvents.emit('message_received', data);
  });
};

RepServer.prototype.getOwnConversations = function() {
  this._socket.send('get_own_chat_ids', { token: this._token });
};

RepServer.prototype.joinConversation = function(chatID) {
  this._socket.send(
    'join_conversation',
    {
      chatID: chatID,
      token: this._token
    }
  );
};

RepServer.prototype.loadConversations = function(loadOnlyEmpty) {
  this._socket.send(
    'get_other_chat_ids',
    {
      token : this._token,
      all : !loadOnlyEmpty
    }
  );
},

global.Server = RepServer;
module.exports = RepServer;
