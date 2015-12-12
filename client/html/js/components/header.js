/** @jsx React.DOM */
var React = require('react');

var s = getStyles();

var Header = React.createClass({
  propTypes: {},
  render: function() {
    return (
      <div className='container-fluid' style={s.container}>
        <div className='col-xs-8' style={s.helplineName}>HELP LINE NAME</div>
        <div className='col-xs-4'>
          <img src='images/cath.png' style={s.userImage} />
          <div style={s.userDetails}>
            <div style={s.userName}>Julie Dean</div>
            <a href='#' style={s.logoutButton}>Log Out</a>
          </div>
        </div>
      </div>
    );
  }
});

function getStyles() {
  return {
    container: {
      background: '#d8d8d8',
      padding: '10px 8px',
      color: '#000',
    },
    helplineName: {
      fontSize: 40,
    },
    userDetails: {
      float: 'right',
      fontSize: 20,
    },
    userName: {
      marginBottom: 10,
    },
    logoutButton: {
      display: 'block',
      color: '#4a90e2',
    },
    userImage: {
      borderRadius: 40,
      width: 80,
      height: 80,
      float: 'right',
      marginLeft: 20,
    },
  };
}

module.exports = Header;
