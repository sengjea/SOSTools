/** @jsx React.DOM */

var React = require('react');
var ReactDOM = require('react-dom');
var Server = require('./Server.js');
var SOSEvents = require('./SOSEvents.js');

SOSEvents.addListener('connected', function() {
  console.log('Yay! We\'re connected!');
});

SOSEvents.addListener('authenticated', function(token) {
  console.log('Authenticated: ' + token);
});

var ChatRep = require('./components/chat-rep.js');

ReactDOM.render(
  <ChatRep />,
  document.getElementById('container_rep')
);

Server.connect();
