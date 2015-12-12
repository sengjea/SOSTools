var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');
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
 */
AllChatsProcessor.register('get_other_chat_ids', function(params) {
	//TODO -- implement this
});

module.exports = AllChatsProcessor;
