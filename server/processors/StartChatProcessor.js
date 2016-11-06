var _ = require('underscore');
var randomcolor = require('randomcolor');
var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/Auth.js');
var data = require('../lib/Data.js');

var processor = new MessageProcessor();

processor.register('start_conversation', function(params, socket) {
	var token = params['token'];
	var new_chat = { chatID: data.newChatID(),
		tokens: [ token ],
		conversation : [],
		color: randomcolor({luminosity: 'bright', format: 'rgb' })
	};
	data.chats.push(new_chat);	
	return new_chat;
});

module.exports = processor;
