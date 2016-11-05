var JSONResponse = function() {}
JSONResponse.prototype.toObject = function() {
  var jsonObject = {};
  var fieldName;
  var fields = this.getJSONFields();
  for (fieldName in fields) {
    jsonObject[fieldName] = fields[fieldName]();
  }
  return jsonObject;
}
JSONResponse.prototype.getJSONFields = function() {
  throw new Error(
    'All subclasses of JSONResponse must provide a key-to-callback map'
  );
}
module.exports = JSONResponse;
