/** @jsx React.DOM */
var React = require('react');
var s = getStyles();

var Team = React.createClass({
  propTypes: {},
  render: function() {
    return (
      <div style={s.container}>
        <div style={s.title}>TEAM</div>
        <div style={s.stats}>
          Queue
          <div style={s.number}>5</div>
        </div>
        <div style={s.stats}>
          Active Chats
          <div style={s.number}>36</div>
        </div>
        <div style={s.stats}>
          Active Helpers
          <div style={s.number}>12</div>
        </div>
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      background: '#9b9898',
      width: '100%',
      padding: 10,
      borderTop: '1px solid #000',
      fontSize: 20,
      color: '#000',
      height: 160,
    },
    title: {
      marginBottom: 10,
    },
    stats: {
      marginLeft: 20,
      marginBottom: 10,
      fontSize: 18,
    },
    number: {
      float:'right',
      marginRight: 10,
    },
  };
}

module.exports = Team;
