var SOSEvents = require('./SOSEvents.js');


// TODO: Add validation to each of these, emit erro cases
function _setupListeners() {

  Server._socket.on('connect', function(){
    SOSEvents.emit('connected');
    Server.authenticate();
  });

  Server._socket.on('message', function(data){
    SOSEvents.emit('message', data);
  });

  Server._socket.on('disconnect', function(){
    SOSEvents.emit('disconnected');
  });
  
  Server._socket.on('get_token', function(data) {
    console.log('get_token received');
    console.log(data);
    var token =  data[0].token;
    Server._token = token;
    window.localStorage.setItem('authToken', token);
    SOSEvents.emit('authenticated', token);
  });

  Server._socket.on('get_own_chat_ids', function(data) {
    SOSEvents.emit('owned_chats_loaded', data);
  });

  Server._socket.on('join_conversation', function(data) {
    SOSEvents.emit('conversation_joined', data);
  });

  Server._socket.on('get_other_chat_ids', function(data) {
    SOSEvents.emit('conversations_loaded', data);
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
    /*
    conversationID,
    messageBody,
    token
    */
  }
 
};

window.Server = Server;
module.exports = Server;

