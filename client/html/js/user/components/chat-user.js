/** @jsx React.DOM */
var React = require('react');
var Header = require('./header.js');
var ChatWindow = require('./chat-window.js');
var NewMessage = require('./new-message.js');
var Loading = require('./loading.js');

var ChatUser = React.createClass({
  propTypes: {},
  getInitialState() {
    return {
      repName: '',
      isLoading: true,
    }
  },
  componentDidMount() {

  },
  render: function() {
    return (
      <div>
        {this.state.isLoading ? <Loading /> :
        <div>
          <Header repName={this.state.repName}/>
          <ChatWindow repName={this.state.repName}/>
          <NewMessage />
        </div>
        }
      </div>
    );
  }
});

module.exports = ChatUser;
