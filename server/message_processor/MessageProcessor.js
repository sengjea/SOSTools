function MessageProcessor() {};
MessageProcessor.prototype.registeredProcessors = {};
MessageProcessor.prototype.register = function(type, callback) {
  this.registeredProcessors[type] = callback; 
}

MessageProcessor.prototype.getRegisteredCallbackMap = function() {
  return this.registeredProcessors;
}

module.exports = MessageProcessor;
