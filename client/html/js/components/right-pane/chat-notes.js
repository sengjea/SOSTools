/** @jsx React.DOM */
var React = require('react');
var s = getStyles();

var ChatNotes = React.createClass({
  propTypes: {
  },
  render: function() {
    return (
      <div style={s.container}>
        <div className='form-group col-xs-4'>
          <label>Name</label>
          <input type='text' className='form-control' />
        </div>
        <div className='form-group col-xs-8'>
          <label>Chat Notes</label>
          <textarea className='form-control'></textarea>
        </div>
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      background: '#f2f2f2',
      padding: 20,
      borderTop: '1px solid #979797',
      height: 150,
    },
  };
}

module.exports = ChatNotes;
