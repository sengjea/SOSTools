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
    SOSEvents.once(
      'authenticated',
      function(token) {
        console.log('Authenticated');
        SOSEvents.once('own_chats_loaded', function(data) {
          console.log('Chats loaded', data);
          if (data.length && data[0].chats.length) {
            var chatID = data[0].chats[0].chatID;
            this.setState({ chatID: chatID });
          }
        }.bind(this));
        UserServer.getInstance().getOwnConversations(); 
        this.setState({ isLoading: false });
      }.bind(this)
    );    
  },
  render: function() {
    var chatWindow;
    if (this.state.chatID) {
      chatWindow = 
        <ChatWindow 
          repName={this.state.repName}
          chatID={this.state.chatID}
        />;
    }
    return (
      <div>
        {this.state.isLoading ? <Loading /> :
        <div>
          <Header repName={this.state.repName}/>
          {chatWindow}
          <NewMessage />
        </div>
        }
      </div>
    );
  }
});

module.exports = ChatUser;
