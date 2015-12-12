var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');

var SendMessageProcessor = new MessageProcessor();

SendMessageProcessor.register('send_message', function(data) {
	// TODO -- implement this 
});

module.exports = SendMessageProcessor;
