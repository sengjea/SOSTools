/** @jsx React.DOM */
var React = require('react');
var ReactDOM = require('react-dom');
var RepServer = require('./RepServer.js');
var ChatRep = require('./components/chat-rep.js');

ReactDOM.render(
  <ChatRep />,
  document.getElementById('container_rep')
);

RepServer.getInstance().connect('test2', 'pass');
