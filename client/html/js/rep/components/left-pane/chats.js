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
        {
          chatId: 'toto',
          colour: 'blue',
          topic: 'toto',
          nbUnread: 3,
        },
        {
          chatId: 'toto',
          colour: 'red',
          topic: 'toto',
          nbUnread: 3,
        },
        {
          chatId: 'toto',
          colour: 'yellow',
          topic: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
          nbUnread: 0,
        }
      ],
    };
  },
  componentDidMount() {
    SOSEvents.addListener('own_chats_loaded', function(data) {

      console.log(data);
    });

    SOSEvents.addListener('conversation_joined', function(data) {

      console.log(data);
    });
  },
  loadChat(chatId) {
    //RepServer.getInstance().joinConversation(chatId);
  },
  renderChats() {
    return this.state.chats.map(function(chat, index) {
      return (
        <div
          style={{
            borderLeft: '10px solid ' + chat.colour,
            padding: 10, cursor: 'pointer',
            borderBottom: '1px solid white',
            }}
          key={index}
          onClick={this.loadChat(chat.chatId)}>
          {chat.topic.substr(0, 15)}
          {chat.topic.length > 15 ? '...' : null}
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
