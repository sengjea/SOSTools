/** @jsx React.DOM */
var React = require('react');

var MoreChatsToggle = React.createClass({
  propTypes: {},
  getInitialState() {
    return {isEnabled: true};
  },
  toggle(val) {
    console.log(val);
  },
  render: function() {
    return (
      <div className='checkbox'>
        <label>
          <input type='checkbox' value='' />I'm available for more chats
        </label>
      </div>  
    );
  }
});

module.exports = MoreChatsToggle;
