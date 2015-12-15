/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var ChatUser = require('./components/chat-user.js');
var UserServer = require('./UserServer.js');

ReactDOM.render(
  <ChatUser />,
  document.getElementById('container_user')
);

UserServer.getInstance().connect();
global.server = UserServer.getInstance();
