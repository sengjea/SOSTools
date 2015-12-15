/** @jsx React.DOM */
var React = require('react');
var s = getStyles();

var Header = React.createClass({
  propTypes: {
    repName: React.PropTypes.string,
  },
  render: function() {
    return (
      <div style={s.container}>
        <div style={{display: 'inline-block'}}>
          HELP LINE NAME<br/>
          {this.props.repName} is here for you
        </div>
        <div style={s.endButton}>X</div>
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      background: '#3b7985',
      width: '100%',
      fontSize: 14,
      padding: 10,
      color: 'white',
      position: 'fixed',
      top: 0,
    },
    endButton: {
      float: 'right',
      border: '2px solid white',
      borderRadius: 20,
      padding: '2px 8px',
      cursor: 'pointer',
      marginTop: 5,
    }
  };
}

module.exports = Header;
