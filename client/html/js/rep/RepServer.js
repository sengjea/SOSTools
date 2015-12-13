var SOSEvents = require('../SOSEvents.js');
var Server = require('../Server.js');

var RepServer = function() {};
RepServer.prototype = new Server();
RepServer._instance = new RepServer();

RepServer.getInstance = function() {
  return RepServer._instance;
}

// TODO: Add validation to each of these, emit error cases
RepServer.prototype.setupListeners = function() {
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
    global.localStorage.setItem('authToken', token);
    SOSEvents.emit('authenticated', token);
  }

  this._socket.on('get_token', function(data) {
    _onToken(data);
  });

  this._socket.on('send_token', function(data) {
    _onToken(data);
  });

  this._socket.on('get_own_chat_ids', function(data) {
    SOSEvents.emit('owned_chats_loaded', data);
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
  this._socket.send('get_own_chat_ids', { token: Server._token }); 
};

RepServer.prototype.joinConversation = function(chatID) {
  this._socket.send(
    'join_conversation', 
    {
      chatID: chatID, 
      token: Server._token
    }
  );
};

RepServer.prototype.loadConversations = function(loadOnlyEmpty) {
  this._socket.send(
    'get_other_chat_ids',
    { 
      token : Server._token,
      all : !loadOnlyEmpty
    }
  );
},
   
global.Server = RepServer;
module.exports = RepServer;

