var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');

var SendMessageProcessor = new MessageProcessor();

SendMessageProcessor.register('send_message', function(data) {
	var token = data['sender_token'];
	auth.log[token].push(data);

	var receiver_tokens = data['receiver_tokens'];
});

module.exports = SendMessageProcessor;