/** @jsx React.DOM */
var React = require('react');
var s = getStyles();

var MoreChatsToggle = React.createClass({
  propTypes: {},
  getInitialState() {
    return {isEnabled: true};
  },
  toggle(event) {
    this.setState({isEnabled: !this.state.isEnabled});
  },
  render: function() {
    return (
      <div style={s.container}>
        <div className='checkbox'>
          <label>
            <input
              type='checkbox'
              value=''
              checked={this.state.isEnabled ? 'checked' : ''}
              onChange={this.toggle}/> I'm available for more chats
          </label>
        </div>
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
    }
  };
}

module.exports = MoreChatsToggle;
