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

var _chats = []; // {chatID, message[]: conversation, token[]: subscribers}[]

var _active_sessions = {};

module.exports = {
	tokens: _tokens,
	chats: _chats,
	active_sessions: _active_sessions,
	newChatID: _newChatID,
	isRep: _isRep
}
