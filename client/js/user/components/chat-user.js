/** @jsx React.DOM */
var React = require('react');
var Header = require('./header.js');
var ChatWindow = require('./chat-window.js');
var NewMessage = require('./new-message.js');
var Loading = require('./loading.js');
var SOSEvents = require('../../SOSEvents.js');
var UserServer = require('../UserServer.js');

var ChatUser = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      repName: '',
      isLoading: true,
      chatID: null,
    }
  },
  componentDidMount() {
    SOSEvents.on('conversation_started', function(data) {
	this.setState({ chatID: data[0].chatID });	
	}.bind(this)
    );
    SOSEvents.on('own_chats_loaded', function(data) {
       if (data[0].chats.length) {
         var chatID = data[0].chats[0].chatID;
         this.setState({ chatID: chatID });
       } else {
     	UserServer.getInstance().StartConversation(); 
       }
     }.bind(this)
    );
    SOSEvents.on('authenticated', function(token) {
        this.setState({ isLoading: false });
    	UserServer.getInstance().getOwnConversations(); 
      }.bind(this)
    ); 
  },
  render: function() {
    var chatWindow;
    var newMessage;
    if (this.state.chatID) {
      chatWindow = 
        <ChatWindow 
          repName={this.state.repName}
          chatID={this.state.chatID}
        />;
      newMessage = <NewMessage chatID={this.state.chatID} />;
    }
    return (
      <div>
        {this.state.isLoading ? <Loading /> :
        <div>
          <Header repName={this.state.repName}/>
          {chatWindow}
          {newMessage}
        </div>
        }
      </div>
    );
  }
});

module.exports = ChatUser;
