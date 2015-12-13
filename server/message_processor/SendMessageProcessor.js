var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');
var data = require('../lib/Data.js');

var SendMessageProcessor = new MessageProcessor();

/*
 * This takes a message ('message')
 * A conversation ID ('chatID')
 * A Sender Auth token ('sender_token')
 * a timestamp ('time')
 *
 * It will broadcast the message to all the
 * other sockets in the chat.
 */
SendMessageProcessor.register('send_message', function(params, socket) {
	var senderToken = params['sender_token'];
	var chatID = params['chatID'];
	var message = params['message'];

	params['time'] = new Date();

	var broadcasts = data.getTokensFromChat(chatID);

	// Finally, add the message to the chat history
	data.addToHistory(chatID, params);

	broadcasts.forEach(function(sendToToken) {
		var sendToSocket = data.getSocketFor(sendToToken)
		sendToSocket.emit('receive_message', params);
	});
});

module.exports = SendMessageProcessor;
