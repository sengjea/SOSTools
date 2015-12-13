/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');

var ChatUser = require('./components/chat-user.js');

ReactDOM.render(
  <ChatUser />,
  document.getElementById('container_user')
);

Server.connect();
