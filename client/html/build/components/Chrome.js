/** @jsx React.DOM */
var React = require('react');
var Chrome = React.createClass({displayName: 'Chrome',
  render: function() {
    return (
      React.DOM.div( {class:"appChrome"}, 
        React.DOM.div( {class:"header"}, 
          " SOSTools :: Client "
        ), 
        React.DOM.div( {class:"main"}
        ),
        React.DOM.div( {class:"footer"}, 
          " Created at Make Stuff Better Hack #3 "
        )
      )
    );
  }
});

module.exports = Chrome;
