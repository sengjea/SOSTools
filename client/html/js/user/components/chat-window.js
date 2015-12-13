/** @jsx React.DOM */
var React = require('react');
var s = getStyles();

var ChatWindow = React.createClass({
  propTypes: {
    repName: React.PropTypes.string,
  },
  getInitialState() {
    return {
      messagesList: [
        {
          received: true,
          message: 'qwdqwlidhwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwqldij dwqlidjwqwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjw ldijqw ld1',
          time: '19:32',
        },
        {
          received: false,
          message: 'qwdqwliwliwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwq ldijqw ld2',
          time: '19:56',
        },
        {
          received: true,
          message: 'qwdqwlidhwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwqldij dwqlidjwqwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjw ldijqw ld1',
          time: '19:32',
        },
        {
          received: false,
          message: 'qwdqwliwliwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwq ldijqw ld2',
          time: '19:56',
        },
        {
          received: true,
          message: 'qwdqwlidhwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwqldij dwqlidjwqwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjw ldijqw ld1',
          time: '19:32',
        },
        {
          received: false,
          message: 'qwdqwliwliwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwq ldijqw ld2',
          time: '19:56',
        },
        {
          received: true,
          message: 'qwdqwlidhwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwqldij dwqlidjwqwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjw ldijqw ld1',
          time: '19:32',
        },
        {
          received: false,
          message: 'qwdqwliwliwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwq ldijqw ld2',
          time: '19:56',
        },
        {
          received: true,
          message: 'qwdqwlidhwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwqldij dwqlidjwqwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjw ldijqw ld1',
          time: '19:32',
        },
        {
          received: false,
          message: 'qwdqwliwliwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwq ldijqw ld2',
          time: '19:56',
        },
        {
          received: true,
          message: 'qwdqwlidhwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwqldij dwqlidjwqwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjw ldijqw ld1',
          time: '19:32',
        },
        {
          received: false,
          message: 'qwdqwliwliwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwq ldijqw ld2',
          time: '19:56',
        },
        {
          received: true,
          message: 'qwdqwlidhwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwqldij dwqlidjwqwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjw ldijqw ld1',
          time: '19:32',
        },
        {
          received: false,
          message: 'qwdqwliwliwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwwlidhwqldij dwqlidjwdhwqldij dwqlidjwq ldijqw ld2',
          time: '19:56',
        },
      ],
    };
  },
  renderMessages() {
    return this.state.messagesList.map(function(message, index) {
      return (
        <div style={message.received ? s.receivedMessage : s.sentMessage} key={index}>
          <div style={s.sender}>
            {message.received ? this.props.repName : 'You:'}
            <div style={s.time}>{message.time}</div>
          </div>
          {message.message}
        </div>
      );
    }.bind(this));
  },
  render: function() {
    return (
      <div style={s.container}>
        {this.renderMessages()}
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      padding: 20,
      marginTop: 65,
      marginBottom: 45,
      color: '#9b9b9b',
    },
    receivedMessage: {
      padding: '15px 20px',
      fontSize: 14,
      lineHeight: '14px',
      background: '#e1dddd',
      width: '80%',
      marginBottom: 5,
      borderRadius: 5,
    },
    sentMessage: {
      padding: '15px 20px',
      fontSize: 14,
      lineHeight: '14px',
      background: 'rgba(79,227,194,.20)',
      width: '80%',
      marginLeft: '20%',
      marginBottom: 5,
      borderRadius: 5,
    },
    sender: {
      marginBottom: 10,
    },
    time: {
      float: 'right',
    },
  };
}

module.exports = ChatWindow;
