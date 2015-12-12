/** @jsx React.DOM */
var React = require('react');
var s = getStyles();

var Chats = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      chats: [
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
        {nbUnread: 4, topic: 'The last few words...', colour: '#ce63e4'},
        {nbUnread: 0, topic: 'The last few words...', colour: '#f5a623'},
      ]
    };
  },
  renderChats() {
    return this.state.chats.map(function(chat, index) {
      return (
        <div style={{background: chat.colour, padding: 10, cursor: 'pointer'}} key={index}>
          {chat.nbUnread !== 0 ? <div style={s.badge}>{chat.nbUnread}</div> : null}
          {chat.topic}
        </div>
      );
    });
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
      background: '#9b9898',
      width: '100%',
      fontSize: 14,
      color: '#000',
      height: window.innerHeight - 320,
      overflow: 'scroll',
    },
    title: {
      marginBottom: 10,
      fontSize: 20,
      padding: 10,
    },
    badge: {
      float: 'left',
      background: '#fff',
      borderRadius: 20,
      padding: '1px 7px',
      marginRight: 10,
    }
  };
}

module.exports = Chats;
