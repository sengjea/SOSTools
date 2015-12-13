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
          <div style={s.number}>-</div>
        </div>
        <div style={s.stats}>
          Active Chats
          <div style={s.number}>-</div>
        </div>
        <div style={s.stats}>
          Active Helpers
          <div style={s.number}>-</div>
        </div>
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      background: '#528ab3',
      width: '100%',
      padding: 10,
      borderTop: '1px solid #fff',
      fontSize: 20,
      color: '#fff',
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
