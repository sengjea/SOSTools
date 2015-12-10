
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

React.renderComponent( 
  React.createElement("h1", null, "The party has started"),
  document.getElementById('container')
);
