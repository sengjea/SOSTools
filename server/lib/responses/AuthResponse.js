var JSONResponse = require('../../lib/responses/JSONResponse.js');

var AuthResponse = function(token) {
  this.token = token;
};

AuthResponse.prototype = new JSONResponse();
AuthResponse.prototype.getJSONFields = function() {
  return {
    token : this.getToken
  };
};

AuthResponse.prototype.token = null;
AuthResponse.prototype.getToken = function() {
  return this.token;
}

module.exports = AuthResponse;
