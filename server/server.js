var io = require('socket.io')(8887);
var MessageHandler = require('./message_handler/MessageHandler.js');
var AuthMessageProcessor = require('./message_processor/AuthMessageProcessor.js');

MessageHandler.registerProcessors([
  AuthMessageProcessor,
]);

console.log('Starting the server');
io.on('connection', function (socket) {
  console.log('Connected');

  socket.on('message', function (type, data) { 
    console.log('message : ' + type + ' : ' + JSON.stringify(data));
    MessageHandler.handle(type, data);   
  });

  socket.on('disconnect', function () { 
    console.log('Disconnected');
  });
});
