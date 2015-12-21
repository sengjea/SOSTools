var io = require('socket.io')(8887);
var MessageHandler = require('./handler/MessageHandler.js');
var AuthMessageProcessor = require('./processors/AuthMessageProcessor.js');
var SendMessageProcessor = require('./processors/SendMessageProcessor.js');
var GetOtherChatIDs = require('./processors/GetOtherChatIDs.js');
var GetOwnChatIDs = require('./processors/GetOwnChatIDs.js');
var JoinChatProcessor = require('./processors/JoinChatProcessor.js');
var LoadConversationProcessor = require('./processors/LoadConversationProcessor.js');


MessageHandler.registerProcessors([
  AuthMessageProcessor, 
  SendMessageProcessor,
  GetOtherChatIDs,
  GetOwnChatIDs,
  JoinChatProcessor,
  LoadConversationProcessor
]);

console.log('Starting the server');
io.on('connection', function (socket) {
  console.log('Connected');

  socket.on('message', function (type, data) { 
    console.log('message : ' + type + ' : ' + JSON.stringify(data));
    var output = MessageHandler.handle(type, data, socket);
    socket.emit(type, output);
  });

  socket.on('disconnect', function () { 
    console.log('Disconnected');
  });
});
