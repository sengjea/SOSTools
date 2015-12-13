/** @jsx React.DOM */
var React = require('react');
var SOSEvents = require('../../../SOSEvents.js');
var RepServer = require('../../RepServer.js');
var s = getStyles();

var Chats = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      chats: [
      ],
    };
  },
  componentDidMount() {
    SOSEvents.addListener('own_chats_loaded', function(data) {
      this.setState({chats: data[0].chats});
    }.bind(this));

    SOSEvents.addListener('conversation_joined', function(data) {
      if (data[0]) {
        var currentChats = this.state.chats;
        currentChats.push(data[0]);
        this.setState({chats: currentChats});
      }
    }.bind(this));
  },
  loadChat(chatID) {
    RepServer.getInstance().loadMessages(chatID);
  },
  renderChats() {
    return this.state.chats.map(function(chat, index) {
      if (!chat.nbUnread) {
        chat.nbUnread = 0;
      }

      if (!chat.colour) {
        chat.colour = 'red';
      }

      return (
        <div
          style={{
            borderLeft: '10px solid ' + chat.colour,
            padding: 10, cursor: 'pointer',
            borderBottom: '1px solid white',
            }}
          key={index}
          onClick={this.loadChat.bind(null, chat.chatID)}
        >
          {chat.conversation[chat.conversation.length - 1].message.substr(0, 25)}...
          {chat.nbUnread !== 0 ? <div style={s.badge}>{chat.nbUnread}</div> : null}
        </div>
      );
    }.bind(this));
  },
  render: function() {
    return (
      <div style={s.container}>
        <div style={s.title}>CHATS</div>
        {this.renderChats()}
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      background: '#528ab3',
      borderTop: '1px solid #fff',
      width: '100%',
      fontSize: 14,
      color: '#fff',
      height: window.innerHeight - 320,
      overflow: 'scroll',
    },
    title: {
      fontSize: 20,
      padding: 10,
      borderBottom: '1px solid #fff',
    },
    badge: {
      float: 'right',
      background: '#fff',
      color: 'black',
      borderRadius: 20,
      padding: '1px 7px',
      marginRight: 10,
    }
  };
}

module.exports = Chats;
