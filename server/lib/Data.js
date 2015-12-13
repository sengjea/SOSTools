function _newChatID() {
	return Math.random().toString(36);
} 

function _getTokenEntry(token) {
	return _tokens.filter(function(elem) {
		elem.token === token;
	});
}

function _isRep(token) {
	var entries = _getTokenEntry(token);

	if (entries.length === 0) {
		return false;
	} else {
		return entries[0].isRep;
	}
}

/*
 * Returns true if a suitable token
 * was found.
 *
 * False if the update failed (i.e. a token wasn't found)
 */
function _updateSocket(token, socket) {
	for (i = 0; i < _tokens.length; i ++) {
		if (_tokens.token === token) {
			_tokens.socket = socket;
			return true;
		}
	}

	return false;
}

// returns the tokens associated with a given chat ID.
// Will return the empty list if no such chat exists.
function _getTokensFrom(chatID) {
	var chat = _inactive_chats.filter(function(elem) {
		return elem.chatID === chatID;
	});

	if (chat.length === 0) {
		return [];
	}

	return chat[0].tokens;
}

var _tokens = []; // {boolean: isRep, string: token, socket: socket}

var _inactive_chats = []; // {chatID, message[]: conversation, token[]: tokens}[]

// TODO -- implement this this thing. 
// When people are authed, if they are a helpee
// and they have a previously enabled chat, 
// it should be copied across into active chats.
// 
// On a helpee disconnect, the helpee chat should be
// moved to inactive
var _active_chats = [] // same orientation as chats. 
// Stuff is copied back and forth as the helpee moves in and
// out of enabled

var _active_sessions = {};

module.exports = {
	tokens: _tokens,
	chats: _inactive_chats,
	active_sessions: _active_sessions,
	newChatID: _newChatID,
	isRep: _isRep,
	getTokensFromChat: _getTokensFrom,
	updateSocket: _updateSocket
}
