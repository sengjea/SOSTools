/** @jsx React.DOM */
var React = require('react');
var s = getStyles();

var ChatWindow = React.createClass({
  propTypes: {
    toggleNotes: React.PropTypes.func,
  },
  render: function() {
    return (
      <div style={s.container}>
        ChatWindow
        <button
          type='button'
          className='btn btn-primary'
          onClick={this.props.toggleNotes}>
            Open Notes
        </button>
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      padding: 20,
      height: window.innerHeight - 250,
    },
  };
}

module.exports = ChatWindow;
