var io = require('socket.io');
var express = require('express');
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

var app = express();

app.use(express.static('client'))
var server = app.listen(process.env.PORT || 3000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
});

var ws = io(server);

ws.on('connection', function (socket) {
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

