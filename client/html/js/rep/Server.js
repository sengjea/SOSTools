var SOSEvents = require('./SOSEvents.js');


// TODO: Add validation to each of these, emit erro cases
function _setupListeners() {

  Server._socket.on('connect', function(){
    SOSEvents.emit('socket_connected');
    Server.authenticate();
  });

  Server._socket.on('message', function(data){
    SOSEvents.emit('message', data);
  });

  Server._socket.on('disconnect', function(){
    SOSEvents.emit('socket_disconnected');
  });

  Server._socket.on('error', function() {
    console.log('error');
    SOSEvents.emit('socket_error');
  });

  function _onToken(data) { 
    console.log('get_token received');
    console.log(data);
    var token =  data[0].token;
    Server._token = token;
    global.localStorage.setItem('authToken', token);
    SOSEvents.emit('authenticated', token);
  }

  Server._socket.on('get_token', function(data) {
    _onToken(data);
  });

  Server._socket.on('send_token', function(data) {
    _onToken(data);
  });

  Server._socket.on('get_own_chat_ids', function(data) {
    SOSEvents.emit('owned_chats_loaded', data);
  });

  Server._socket.on('join_conversation', function(data) {
    console.log('conversation joined');
    console.log(data);
    SOSEvents.emit('conversation_joined', data);
  });

  Server._socket.on('get_other_chat_ids', function(data) {
    console.log('chats loaded');
    console.log(data);
    SOSEvents.emit('conversations_loaded', data);
  });

  Server._socket.on('receive_message', function(data) {
    SOSEvents.emit('message_received', data); 
  });
}

var Server = {
  _socket: null,
  _token: null,
  connect: function() {
    var socket = io('ws://localhost:8887');
    Server._socket = socket;
     
    _setupListeners();
  },
  authenticate: function(username, password) {
    if (window.localStorage.authToken) {
      console.log('Using locally stored auth token');
      SOSEvents.emit('authenticated', window.localStorage.authToken);
      Server._token = window.localStorage.authToken;
      
      // Make sure the server knows we're know who we are
      Server._socket.send(
        'send_token',
        { token: Server._token }
      );
      return;
    }
    Server._socket.send(
      'get_token', 
      { 
        name: username, 
        password: password
      }
    );
  },

  getOwnConversations: function() {
    Server._socket.send('get_own_chat_ids', { token: Server._token }); 
  },

  joinConversation: function(chatID) {
    Server._socket.send(
      'join_conversation', 
      {
        chatID: chatID, 
        token: Server._token
      }
    );
  },

  loadConversations: function(loadOnlyEmpty) {
    Server._socket.send(
      'get_other_chat_ids',
      { 
        token : Server._token,
        all : !loadOnlyEmpty
      }
    );
  },
   
  sendMessage: function(conversationID, messageBody) {
    Server._socket.send(
      'send_message',
      {
        chatID : chatID,
        message: messageBody,
        sender_token: Server._token
      }
    );
  }
};

global.Server = Server;
module.exports = Server;

