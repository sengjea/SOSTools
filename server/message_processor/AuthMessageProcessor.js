var MessageProcessor = require('./MessageProcessor.js');
var auth = require('../lib/auth.js');

var AuthMessageProcessor = new MessageProcessor();
var count = 0;

AuthMessageProcessor.register('get_token', function(data) {
  count ++;
  console.log(count);
  if (data.name === undefined || data.password === undefined) {
      return {token: "Bad request. Need 'name' and 'password'"};
  }

  var authToken = auth.genAuthToken(data.name, data.password);

  if (!(authToken in auth.log)) {
	  auth.log[authToken] = [];
  }
  return {token: authToken};
});

module.exports = AuthMessageProcessor; 
