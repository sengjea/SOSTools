/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var ChatNotes = require('./chat-notes.js');
var s = getStyles();

var ChatWindow = React.createClass({
  propTypes: {
  },
  getInitialState() {
    return {
      isNoteOpen: false,
      messagesList: [
        {
          received: true,
          message: 'qwdqwlidhwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwqldij dwqlidjwqwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjw ldijqw ld1',
        },
        {
          received: false,
          message: 'qwdqwliwliwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwq ldijqw ld2',
        },
      ],
    };
  },
  toggleNotes() {
    this.setState({isNoteOpen: !this.state.isNoteOpen});
  },
  renderMessages() {
    return this.state.messagesList.map(function(message, index) {
      return (
        <div style={message.received ? s.receivedMessage : s.sentMessage} key={index}>
          {message.message}
        </div>
      );
    });
  },
  render: function() {
    var messagesStyle = s.messagesList;

    if (this.state.isNoteOpen) {
      messagesStyle = _.extend(_.clone(s.messagesList), {height: window.innerHeight - 425});
    }

    return (
      <div>
        <div style={s.container}>
          <div style={s.header}>
            Someone is asking for help. Chat Started at 19:30
          </div>
          <div style={messagesStyle}>
            {this.renderMessages()}
          </div>
          <div style={s.newMessage}>
            <div className='form-group col-xs-10'>
              <input type='text' className='form-control'
                placeholder='Start Helping here. press ENTER to send.'/>
            </div>
            <span style={s.toggleNotes} onClick={this.toggleNotes}>
              {this.state.isNoteOpen ?
                <i className='glyphicon glyphicon-chevron-up' />
              : <i className='glyphicon glyphicon-chevron-down' />}
            </span>

          </div>
          {this.state.isNoteOpen ? <ChatNotes /> : null}
        </div>

      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      paddingTop: 20,
    },
    header: {
      width: 360,
      fontSize: 14,
      height: 30,
      padding: '5px 20px',
      margin: 'auto',
      background: '#f0ecec',
      borderRadius: 15,
    },
    messagesList: {
      margin: 20,
      height: window.innerHeight - 275,
      overflow: 'scroll',
    },
    newMessage: {
      height: 85,
      background: '#f2f2f2',
      padding: 20,
    },
    toggleNotes: {
      fontSize: 20,
      marginLeft: 20,
      cursor: 'pointer',
    },
    receivedMessage: {
      padding: '15px 20px',
      fontSize: 14,
      lineHeight: '14px',
      background: '#ede9e9',
      width: '80%',
      marginBottom: 5,
    },
    sentMessage: {
      padding: '15px 20px',
      fontSize: 14,
      lineHeight: '14px',
      background: '#50e3c2',
      width: '80%',
      marginLeft: '20%',
      marginBottom: 5,
    },
  };
}

module.exports = ChatWindow;
