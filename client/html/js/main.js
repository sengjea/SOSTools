/** @jsx React.DOM */

var React = require('react');
var ReactDOM = require('react-dom');
var Server = require('./Server.js');
var SOSEvents = require('./SOSEvents.js');

window.SOSEvents = SOSEvents;
SOSEvents.addListener('connected', function() {
  console.log('Yay! We\'re connected!');
});

var ChatRep = require('./components/chat-rep.js');

React.renderComponent(
  <ChatRep />,
  document.getElementById('container_rep')
);

Server.connect();
