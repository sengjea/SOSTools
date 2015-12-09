var MessageProcessor = require('../message_processor/MessageProcessor.js');
var processors = {};

function _registerProcessor(type, callback) {
  if (!processors[type]) {
    processors[type] = [];
  }
  processors[type].push(callback); 
}

var MessageHandler = {
  handle: function(type, data) {
    if (!processors[type]) {
      console.log(
        'Unhandled message: ' + type + ' with data: ' + JSON.stringify(data));
      return;
    } 
    processors[type].forEach(function(callback) {
      callback(type, data);
    });
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
