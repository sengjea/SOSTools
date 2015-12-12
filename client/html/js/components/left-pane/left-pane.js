/** @jsx React.DOM */
var React = require('react');
var Chats = require('./chats.js');
var Team = require('./team.js');
var MoreChatsToggle = require('./more-chats-toggle.js');

var LeftPane = React.createClass({
  propTypes: {},
  render: function() {
    return (
      <div>
        <Chats />
        <Team />
        <MoreChatsToggle />
      </div>
    );
  }
});

module.exports = LeftPane;
