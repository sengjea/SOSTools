/** @jsx React.DOM */

var EventEmitter = require('events').EventEmitter;
var React = require('react');
var ReactDOM = require('react-dom');

var socket = io('ws://localhost:8887');
socket.on('connect', function(){
  console.log('connected');
});
socket.on('event', function(data){
  console.log(data);
});
socket.on('disconnect', function(){
  console.log('disconnected');
});

var ChatRep = require('./components/chat-rep.js');

React.renderComponent(
  <ChatRep />,
  document.getElementById('container_rep')
);
