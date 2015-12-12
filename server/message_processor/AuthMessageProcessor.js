var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');

var AuthMessageProcessor = new MessageProcessor();

AuthMessageProcessor.register('get_token', function(data) {
  if (data.name === undefined || data.password === undefined) {
      return {token: "Bad request. Need 'name' and 'password'"};
  }

  var authToken = auth.genAuthToken(data.name, data.password);

  return {token: authToken};
});

module.exports = AuthMessageProcessor; 
