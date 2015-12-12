var _tokens = []; // {string: repName, string: authToken}

var _chats = {}; // {tokens[], conversation[]}

var _active_sessions = {};

module.exports = {
	tokens: _tokens,
	chats: _chats,
	active_sessions: _active_sessions
}
