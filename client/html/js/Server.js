var SOSEvents = require('./SOSEvents.js');

var Server = {
  _socket: null,
  connect: function() {
    var socket = io('ws://localhost:8887');
    Server._socket = socket;
    Server._socket.on('connect', function(){
      SOSEvents.emit('connected');
      Server.start();
    });
    Server._socket.on('message', function(data){
      SOSEvents.emit('message', data);
    });
    Server._socket.on('disconnect', function(){
      SOSEvents.emit('disconnected');
    }); 
  },
  start: function() {
    if (window.localStorage.authToken) {
      Server._socket.send('get_token', {});
    } else {
      SOSEvents.emit('authenticated');
    }
  }
};

window.Server = Server;
module.exports = Server;

