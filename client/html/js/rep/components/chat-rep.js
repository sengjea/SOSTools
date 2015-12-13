/** @jsx React.DOM */
var React = require('react');
var Header = require('./header.js');
var Chats = require('./left-pane/chats.js');
var Team = require('./left-pane/team.js');
var MoreChatsToggle = require('./left-pane/more-chats-toggle.js');
var ChatWindow = require('./right-pane/chat-window.js');

var ChatRep = React.createClass({
  propTypes: {},
  render: function() {
    return (
      <div className='container-fluid' style={{padding: 0}}>
        <div className='col-xs-12' style={{padding: 0}}> <Header /> </div>
        <div className='col-xs-3' style={{padding: 0}}>
          <Chats />
          <Team />
          <MoreChatsToggle />
        </div>
        <div className='col-xs-9' style={{padding: 0}}> <ChatWindow /> </div>
      </div>
    );
  }
});

module.exports = ChatRep;
