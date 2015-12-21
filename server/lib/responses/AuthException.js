var JSONResponse = require('../../lib/responses/JSONResponse.js');

var AuthException = function(error) {
  this.error = error;
};

AuthException.prototype = new JSONResponse();
AuthException.prototype.error = null;
AuthException.prototype.getError = function() {
  return this.error;
}

AuthException.prototype.getJSONFields = function() {
  return {
    error : this.getError
  };
};

module.exports = AuthException;
