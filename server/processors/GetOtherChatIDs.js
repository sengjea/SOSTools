var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/Auth.js');
var data = require('../lib/Data.js');

var AllChatsProcessor = new MessageProcessor();

/*
 * This takes a token ('token') from a rep,
 * and returns all the active chats.
 *
 * If it is passed the token from a helpee, then it
 * will return an empty list.
 *
 * You can also specify an optional argument ('all', boolean)
 * to return all the chats, regardless of
 * whether they are empty or not.
 *
 * The returned object is of the form
 * {chats: ["id1", "id2", ....]}
 */
AllChatsProcessor.register('get_other_chat_ids', function(params, socket) {
	var token = params['token'];
	var all = params['all'];

	var isRep = data.isRep(token);

	if (!isRep) {
		return {chats: [], rep: "Not a rep"};
	}

  var chats = data.chats;
  var ids = [];
  for (var ii=0; ii<chats.length; ii++) {
    if (all || chats[ii].tokens.length === 1) { 
      ids.push(chats[ii].chatID);
    }
  }
	return { chats: ids };
});

module.exports = AllChatsProcessor;
