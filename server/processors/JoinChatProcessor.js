var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/Auth.js');
var data = require('../lib/Data.js');

var JoinChatProcessor = new MessageProcessor();

/*
 * Takes a chat ID ('chatID') and a token('token') 
 * from a rep.
 *
 * Then creates said chat.
 *
 * If the token is not from a rep, 
 * or if the chat is existant, the data returned will
 * indicate so
 *
 * {'created': false}
 *
 * If the creation is successful, then we get
 *
 * {'created': true, chat: {/* The chat object that was just joined * /}}
 */
JoinChatProcessor.register('join_conversation', function(params, socket) { 
	console.log('j_c', JSON.stringify(params), JSON.stringify(data.chats));
	var chatID = params['chatID'];
	var repToken = params['token'];
	var chat = null;
	if (!data.isRep(repToken)) {
		return {'created': false};
	}
	for (i = 0; i < data.chats.length; i ++) {
		if (data.chats[i].chatID === chatID) {
			chat = data.chats[i];
			if (!chat.tokens) {
				chat_tokens = [ repToken ];
			} else if (chat.tokens.indexOf(repToken) === -1) {
				chat.tokens.push(repToken);
			}
			break;
		}
	}

	return {'created': true, chat: chat};
});

module.exports = JoinChatProcessor;
