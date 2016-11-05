var JSONResponse = require('../../lib/responses/JSONResponse.js');

var AuthResponse = function(token) {
  this.getToken = () => { return token };
};

AuthResponse.prototype = new JSONResponse();
AuthResponse.prototype.getJSONFields = function() {
  return {
    token : this.getToken
  };
};

module.exports = AuthResponse;
