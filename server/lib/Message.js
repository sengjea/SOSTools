function Message() {}

Message.prototype.senderId = null;
Message.prototype.threadId = null;
Message.prototype.type = null;
Message.prototype.body = null;
Message.prototype.time = null;
Message.prototype.seenBy = [];

Message.prototype.getSenderId = function() {
  return this.senderId;
}

Message.prototype.setSenderId = function(senderId) {
  this.senderId = senderId;
  return this;
}

Message.prototype.getThreadId = function() {
  return this.threadId;
}

Message.prototype.setThreadId = function(threadID) {
  this.threadId = threadId;
  return this;
}

Message.prototype.getType = function() {
  return this.type;
}

Message.prototype.setType = function(type) {
  this.type = type;
  return this;
}

Message.prototype.getBody = function() {
  return this.body;
}

Message.prototype.setBody = function(body) {
  this.body = body;
  return this;
}

Message.prototype.getTime = function() {
  return this.time;
}

Message.prototype.setTime = function(time) {
  this.time = time;
  return this;
}

Message.prototype.getSeenBy = function() {
  return this.seenBy;
}

Message.prototype.setSeenBy = function(seenBy) {
  this.seenBy = seenBy;
  return this;
}

Message.prototype.serialize = function() {
  return {
    senderId: this.senderId,
    threadId: this.threadId,
    time: this.time, 
    type: this.type,
    body: this.body,
    seenBy : this.seenBy
  };
}
Message.prototype.toString = function() {
  return JSON.stringify(this.serialize());
}

module.exports = Message;
