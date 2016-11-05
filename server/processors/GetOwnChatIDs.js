var _ = require('underscore');
var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/Auth.js');
var data = require('../lib/Data.js');

var SendMessageProcessor = new MessageProcessor();

/*
 * Takes a 'token' and returns all the associated
 * chat ids.
 *
 * For a rep, this is all the chats they are currently
 * members of.
 *
 * For helpees, this is only the chat that they are a part of.
 *
 * The object returned will be of the form
 * { chats: [....]} with all the chatIDs displayed
 */
SendMessageProcessor.register('get_own_chat_ids', function(params, socket) {
	var token = params['token'];
	var active_chats = data.chats.filter(function(elem) {
		return (_.contains(elem.tokens, token));
	});
	if (active_chats.length == 0 && token && !data.isRep(token)) {
		var newChatID = data.newChatID();
		active_chats[0] = { "chatID": newChatID, "tokens" : [ token ], "conversation" : [] };
		data.chats.push(active_chats[0]);	
	}
        console.log(JSON.stringify(params), JSON.stringify(data.chats), active_chats);
	return {chats: active_chats};
});

module.exports = SendMessageProcessor;
