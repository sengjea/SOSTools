/** @jsx React.DOM */
var React = require('react');
var RepServer = require('../../RepServer.js');
var SOSEvents = require('../../../SOSEvents.js');
var _ = require('underscore');
var ChatNotes = require('./chat-notes.js');
var s = getStyles();

var ChatWindow = React.createClass({
  propTypes: {
  },
  getInitialState() {
    return {
      isNoteOpen: false,
      messagesList: [],
      currentMessage: '',
      chatId: '',
    };
  },
  componentDidUpdate() {
    // this.refs.chatWindow.scrollTop = this.refs.chatWindow.scrollHeight + 'px';
  },
  componentDidMount() {
    SOSEvents.addListener('receive_message', function(data) {
      console.log("cw-rw", JSON.stringify(data));
      if (data && this.state.chatId === data.chatID) {
        var currentMessagesList = this.state.messagesList;
        currentMessagesList.push(data);
        this.setState({messagesList: currentMessagesList});
      }
    }.bind(this));

    SOSEvents.addListener('conversation_loaded', function(data) {
      this.setState({messagesList: data[0].messages, chatId: data[0].chatID});
    }.bind(this));
  },
  toggleNotes() {
    this.setState({isNoteOpen: !this.state.isNoteOpen});
  },
  renderMessages() {
    var myToken = RepServer.getInstance().getToken();

    return this.state.messagesList.map(function(message, index) {
      var d = new Date(message.time);

      return (
        <div style={message.sender_token !== myToken ? s.receivedMessage : s.sentMessage} key={index}>
          <div style={{textAlign: 'right', marginBottom: 10, color: '#9b9b9b'}}>{d.toString()}</div>
          {message.message}
        </div>
      );
    });
  },
  handleKeyPressed(e) {
    if (e.key === 'Enter' && this.state.currentMessage !== '') {
      RepServer.getInstance().sendMessage(this.state.chatId, e.target.value);
      this.setState({currentMessage: ''});
    }
  },
  handleChange(event) {
    this.setState({currentMessage: event.value});
  },
  render: function() {

    var messagesStyle = s.messagesList;

    if (this.state.isNoteOpen) {
      messagesStyle = _.extend(_.clone(s.messagesList), {height: window.innerHeight - 425});
    }

    if (this.state.messagesList.length === 0) {
      return (
        <div>
          <div style={s.containerEmpty}>
            <h1>Welcome Julie!</h1>
            <p>You have no active chats right now. <br/>
            Click the "Add a new chat" button
            to start helping</p>
          </div>
        </div>
      );
    }

    var startDate = new Date(this.state.messagesList[0].time);

    return (
      <div>
        <div style={s.container} >
          <div style={s.header}>
            Someone is asking for help. Chat Started at {startDate.toString()}
          </div>
          <div style={messagesStyle} ref="chatWindow">
            {this.renderMessages()}
          </div>
          <div style={s.newMessage}>
            <div className='form-group col-xs-10'>
              <input type='text' className='form-control' style={{padding: 25}}
                placeholder='Start Helping here. press ENTER to send.'
                onKeyPress={this.handleKeyPressed}
                onChange={this.handleChange}
                value={this.state.currentMessage}/>
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
    containerEmpty: {
      textAlign: 'center',
      width: '100%',
      marginTop: '30%',
    },
    header: {
      width: '80%',
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
      borderRadius: 5,
    },
    sentMessage: {
      padding: '15px 20px',
      fontSize: 14,
      lineHeight: '14px',
      background: 'rgba(79, 227, 194, .20)',
      width: '80%',
      marginLeft: '20%',
      marginBottom: 5,
      borderRadius: 5,
    },
  };
}

module.exports = ChatWindow;
