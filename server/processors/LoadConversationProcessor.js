var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');
var data = require('../lib/Data.js');

var LoadConversationProcessor = new MessageProcessor();

/*
 * This takes a chatID (under 'chatID') and
 * a token (under 'token').
 *
 * If the user is authorized to view the
 * chat, we return the chat. In the case
 * the user is not authorized, or the chat
 * does not exist, we return an error message
 * with an empty list.
 *
 * This will be of the form:
 * {messages: message[], status: string}
 * For the format of message, see MessageProcessor.js
 * It is the same message that is stored
 * in MessageProcessor.js
 */
LoadConversationProcessor.register('load_conversation', function(params, socket) {
	var token = params['token'];
	var chatID = params['chatID'];

	if (!data.chatExists(chatID)) {
		return {
      messages: [], 
      status: 'Chat ' + chatID + ' does not exist'
    }
	}

	function contains(a, obj) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] === obj) {
				return true;
			}
		}
		return false;
	}

	var chat = data.getChat(chatID);
	if (data.isRep(token) && chat) {
		// In this case, they are always
		// cleared to see the chat
		return {
      messages: chat.conversation, 
      chatID: chatID, 
      status: 'OK'
    };
	} else if (chat) {
		if (contains(chat.tokens, token)) {
			// We're OK
			return {
        messages: chat.conversation, 
        chatID: chatID, 
        status: 'OK'
      };
		}
	}

	return {
    messages: [], 
    status: 'Not cleared to view this conversation', 
    debug: { 
      providedToken: token,
      chatData: chat,
      chatID: chatID
    } 
  };
});

module.exports = LoadConversationProcessor;
