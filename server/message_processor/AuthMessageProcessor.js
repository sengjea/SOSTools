var MessageProcessor = require('./MessageProcessor.js');

var AuthMessageProcessor = new MessageProcessor();

AuthMessageProcessor.register('get_token', function(data) {
  console.log('Whoa');
});

module.exports = AuthMessageProcessor; 
