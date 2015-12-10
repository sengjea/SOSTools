/** @jsx React.DOM */

var EventEmitter = require('events').EventEmitter;
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

ReactDOM.render( 
  <h1>The party has begun. Ahoy matey. Hm.</h1>,
  document.getElementById('container')
);
