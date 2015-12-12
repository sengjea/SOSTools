/** @jsx React.DOM */

var React = require('react');
var Chrome = require('./components/Chrome.js');
var Server = require('./Server.js');
var SOSEvents = require('./SOSEvents.js');

window.SOSEvents = SOSEvents;
SOSEvents.addListener('connected', function() {
  console.log('Yay! We\'re connected!');
});

React.renderComponent( 
  <Chrome />,
  document.getElementById('container')
);

Server.connect();
