var io = require('socket.io')(8887);
var auth = require('./lib/auth.js');
var MessageHandler = require('./message_handler/MessageHandler.js');
var AuthMessageProcessor = require('./message_processor/AuthMessageProcessor.js');
var SendMessageProcessor = require('./message_processor/SendMessageProcessor.js');
var GetOtherChatIDs = require('./message_processor/GetOtherChatIDs.js');
var GetOwnChatIDs = require('./message_processor/GetOwnChatIDs.js');
var JoinChatProcessor = require('./message_processor/JoinChatProcessor.js');


MessageHandler.registerProcessors([
  AuthMessageProcessor, 
  SendMessageProcessor,
  GetOtherChatIDs,
  GetOwnChatIDs,
  JoinChatProcessor
]);

console.log('Starting the server');
io.on('connection', function (socket) {
  console.log('Connected');

  socket.on('message', function (type, data) { 
    console.log('message : ' + type + ' : ' + JSON.stringify(data));
    var output = MessageHandler.handle(type, data);
    socket.emit('return_' + type, output);
  });

  socket.on('disconnect', function () { 
    console.log(auth.log);
    console.log('Disconnected');
  });
});
