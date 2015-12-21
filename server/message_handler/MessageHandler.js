var MessageProcessor = require('../processors/MessageProcessor.js');
var processors = {};

function _registerProcessor(type, callback) {
  if (!processors[type]) {
    processors[type] = [];
  }
  processors[type].push(callback); 
}

var MessageHandler = {
  handle: function(type, data, socket) {
    if (!processors[type]) {
      console.log(
        'Unhandled message: ' + type + ' with data: ' + JSON.stringify(data));
      return;
    } 
    var output = [];
    processors[type].forEach(function(callback) {
      output.push(callback(data, socket));
    });
    return output;
  },
  
  registerProcessors: function(listOfProcessors) {
    listOfProcessors.forEach(function(processor) {
      var type;
      if (!(processor instanceof MessageProcessor)) {
        throw new Error(
          'Attempted to register something that isn\'t a MessageProcessor'
        );
      }
      var callbacks = processor.getRegisteredCallbackMap();
      for (type in callbacks) {
        _registerProcessor(type, callbacks[type]);
      }
    });
  }
};

module.exports = MessageHandler;
