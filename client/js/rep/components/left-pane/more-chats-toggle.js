/** @jsx React.DOM */
var React = require('react');
var RepServer = require('../../RepServer.js');
var SOSEvents = require('../../../SOSEvents.js');
var s = getStyles();

// transformed into a button for quick prototype

var MoreChatsToggle = React.createClass({
  propTypes: {},
  /*getInitialState() {
    return {isEnabled: true};
  },
  toggle(event) {
    this.setState({isEnabled: !this.state.isEnabled});
  },
  <div className='checkbox'>
    <label>
      <input
        type='checkbox'
        value=''
        checked={this.state.isEnabled ? 'checked' : ''}
        onChange={this.toggle}/> I'm available for more chats
    </label>
  </div>*/
  addNewChat() {
    SOSEvents.addListener('conversations_loaded', function(data) {
      if (data[0].chats) {
        RepServer.getInstance().joinConversation(data[0].chats[0]);
      }
    });
    RepServer.getInstance().loadConversations(true);
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