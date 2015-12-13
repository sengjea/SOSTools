/** @jsx React.DOM */
var React = require('react');
var Header = require('./header.js');
var ChatWindow = require('./chat-window.js');
var NewMessage = require('./new-message.js');

var ChatUser = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      repName: 'Michael',
    }
  },
  render: function() {
    return (
      <div >
        <Header repName={this.state.repName}/>
        <ChatWindow repName={this.state.repName}/>
        <NewMessage />
      </div>
    );
  }
});

module.exports = ChatUser;
