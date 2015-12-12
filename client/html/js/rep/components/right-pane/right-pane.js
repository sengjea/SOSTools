/** @jsx React.DOM */
var React = require('react');
var ChatWindow = require('./chat-window.js');
var ChatNotes = require('./chat-notes.js');

var RightPane = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      isNoteOpen: false,
    };
  },
  toggleNotes() {
    this.setState({isNoteOpen: !this.state.isNoteOpen});
  },
  render: function() {
    return (
      <div>
        <ChatWindow toggleNotes={this.toggleNotes}/>
        {this.state.isNoteOpen ? <ChatNotes /> : null}
      </div>
    );
  }
});

module.exports = RightPane;
