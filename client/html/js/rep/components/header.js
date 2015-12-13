/** @jsx React.DOM */
var React = require('react');
var SOSEvents = require('../../SOSEvents.js');

var s = getStyles();

var Header = React.createClass({
  propTypes: {
    connected : React.PropTypes.string
  },
  getInitialState: function() {
    return {
      connected: this.props.connected
    };
  },
  render: function() {
    SOSEvents.addListener('socket_connected', function() {
      this.setState({ connected: true });
    }.bind(this));

    SOSEvents.addListener('socket_error', function() {
      this.setState({ connected: false });
    }.bind(this));

    var connectedState =
      this.state.connected ? "online" : "offline";
    return (
      <div className='container-fluid' style={s.container}>
        <div className='col-xs-8' style={s.helplineName}>
          Helpline Bling ({connectedState})
        </div>
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
      height: 100,
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
