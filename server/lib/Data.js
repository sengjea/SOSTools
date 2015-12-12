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

var _tokens = []; // {boolean: isRep, string: token}

var _inactive_chats = []; // {chatID, message[]: conversation, token[]: subscribers}[]

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
	isRep: _isRep
}
