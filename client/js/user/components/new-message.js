/** @jsx React.DOM */
var React = require('react');
var UserServer = require('../UserServer.js');
var s = getStyles();

var NewMessage = React.createClass({
  propTypes: {
    chatID: React.PropTypes.string
  },

  sendMessage: function() {
    console.log('Sending your message...');
    var message = this.refs.messageContent.value;
    UserServer.getInstance().sendMessage(
      this.props.chatID,
      message
    ); 
    this.refs.messageContent.value = null;
  },

  render: function() {
    return (
      <div style={s.container}>
        <div className='form-group col-xs-10' style={{padding: 0}}>
          <input 
            type='text' 
            className='form-control' 
            style={s.input}
            placeholder='Tell me what’s on your mind'
            ref="messageContent"
          />
        </div>
        <div 
          className='col-xs-2' 
          onClick={this.sendMessage}
          style={s.sendButton}>
          send
        </div>
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      background: '#50e3c2',
      width: '100%',
      fontSize: 14,
      padding: 5,
      height: 45,
      position: 'fixed',
      bottom: 0,
      borderTop: '1px solid #c7c4c4',
    },
    input: {
      border: '1px solid #c7c4c4',
      fontSize: 14,
    },
    sendButton: {
      cursor: 'pointer',

    }
  };
}

module.exports = NewMessage;
