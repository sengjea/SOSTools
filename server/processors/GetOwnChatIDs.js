var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');
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
	function contains(a, obj) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] === obj) {
				return true;
			}
		}
		return false;
	}

	var token = params['token'];
	var active_chats = data.chats.filter(function(elem) {
		return (contains(elem.tokens, token));
	});

	return {chats: active_chats};
});

module.exports = SendMessageProcessor;
