var SOSEvents = require('./SOSEvents.js');

var Server = {
  _socket: null,
  connect: function() {
    var socket = io('ws://localhost:8887');
    Server._socket = socket;
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
  },
  authenticate: function() {
    if (window.localStorage.authToken) {
      SOSEvents.emit('authenticated', window.localStorage.authToken);
      return
    }

    Server._socket.on('get_token', function(data) {
      var token =  data[0].token;
      window.localStorage.setItem('authToken', token);
      SOSEvents.emit('authenticated', token);
    });
    Server._socket.send('get_token', {})
  }
};

window.Server = Server;
module.exports = Server;

