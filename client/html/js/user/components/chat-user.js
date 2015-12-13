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
    }
  },
  componentDidMount() {
    SOSEvents.addListener(
      'authenticated',
      function(token) {
        SOSEvents.addListener('own_chats_loaded', function(data) {
          console.log(data);
        });
        UserServer.getInstance().getOwnConversations(); 
        this.setState({ isLoading: false });
      }.bind(this)
    );    
  },
  render: function() {
    return (
      <div>
        {this.state.isLoading ? <Loading /> :
        <div>
          <Header repName={this.state.repName}/>
          <ChatWindow repName={this.state.repName}/>
          <NewMessage />
        </div>
        }
      </div>
    );
  }
});

module.exports = ChatUser;
