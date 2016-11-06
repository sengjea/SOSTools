/** @jsx React.DOM */
var React = require('react');
var RepServer = require('../../RepServer.js');
var SOSEvents = require('../../../SOSEvents.js');
var s = getStyles();

// transformed into a button for quick prototype

var MoreChatsToggle = React.createClass({
  propTypes: {},
  addNewChat() {
    RepServer.getInstance().loadConversations(false);
  },
  componentDidMount() {
    SOSEvents.addListener('conversations_loaded', function(data) {
      if (data[0].chats) {
        RepServer.getInstance().joinConversation(data[0].chats[0]);
      }
    });
  },
  render: function() {
    return (
      <div style={s.container}>
        <button className='btn' onClick={this.addNewChat} style={s.btn}>Add a new chat</button>
      </div>
    );
  }
});

function getStyles(){
  return {
    container: {
      background: '#d8d8d8',
      width: '100%',
      padding: 10,
      height: 60,
    },
    btn: {
      width: '100%',
      marginTop: 4, 
    }
  };
}

module.exports = MoreChatsToggle;
