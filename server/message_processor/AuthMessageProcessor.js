var MessageProcessor = require('./MessageProcessor.js');

var AuthMessageProcessor = new MessageProcessor();

AuthMessageProcessor.register('get_token', function(data) {
  console.log('Whoa');
  return { jackson: 'is awesome' };
});

module.exports = AuthMessageProcessor; 
