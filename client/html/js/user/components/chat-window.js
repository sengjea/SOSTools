/** @jsx React.DOM */
var React = require('react');
var UserServer = require('../UserServer.js');
var SOSEvents = require('../../SOSEvents.js');
var s = getStyles();

var ChatWindow = React.createClass({
  propTypes: {
    repName: React.PropTypes.string,
    chatID: React.PropTypes.string,
  },
  getInitialState() {
    return {
      conversationLoaded: false,
      messagesList: [
        {
          token: UserServer.getInstance().getToken(),
          message: 'Fetching messages...',
          time: '',
        },
      ],
    };
  },

  componentDidMount() {
    SOSEvents.once(
      'conversation_loaded',
      function(data) { 
        this.setState({ 
          conversationLoaded: true,
          messagesList: 
            this.state.messagesList.concat(data[0].messages) 
        });
      }.bind(this)
    );

    SOSEvents.addListener(
      'receive_message',
      function(data) {
        var list = this.state.messagesList;
        console.log(data.message);
        list.push(data);
        this.setState({ messagesList : list });
      }.bind(this)
    );
  },  

  componentDidUpdate: function() {
    this.refs.chatWindow.scrollTop = 
      this.refs.chatWindow.scrollHeight + 'px';
    window.scrollTo(0, this.refs.chatWindow.scrollHeight);
  },

  renderMessages() {
    var token = UserServer.getInstance().getToken();
    return this.state.messagesList.map(function(message, index) {
      var is_your_own_message = message.sender_token === token;
      return (
        <div style={!is_your_own_message ? s.receivedMessage : s.sentMessage} key={index}>
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
    if (this.props.chatID) {
      UserServer.getInstance().loadMessages(this.props.chatID);
    }
    return (
      <div style={s.container} ref="chatWindow">
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
