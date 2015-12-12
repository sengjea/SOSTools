var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');

var AuthMessageProcessor = new MessageProcessor();

AuthMessageProcessor.register('get_token', function(data) {
  if (data.name === undefined || data.password === undefined) {
      return {token: "Bad request. Need 'name' and 'password'"};
  }
  return {token: auth.genAuthToken(data.name, data.password)};
});

module.exports = AuthMessageProcessor; 
