/** @jsx React.DOM */
var React = require('react');
var Header = require('./header.js');
var ChatWindow = require('./chat-window.js');

var ChatUser = React.createClass({
  propTypes: {},
  render: function() {
    return (
      <div >
        <div> <Header /> </div>
        <div>
          <ChatWindow />
        </div>
      </div>
    );
  }
});

module.exports = ChatUser;
