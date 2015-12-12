var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');

var SendMessageProcessor = new MessageProcessor();
var count = 0;

SendMessageProcessor.register('send_message', function(data) {
	count ++;
	console.log(count);
	var token = data['sender_token'];
	console.log(auth.log);
	auth.log[token].push(data);

	var message = data['message'];

	

});

module.exports = SendMessageProcessor;
