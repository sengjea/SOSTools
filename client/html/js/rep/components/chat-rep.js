/** @jsx React.DOM */
var React = require('react');

var Header = require('./header.js');
var LeftPane = require('./left-pane/left-pane.js');
var RightPane = require('./right-pane/right-pane.js');

var ChatRep = React.createClass({
  propTypes: {},
  render: function() {
    return (
      <div className='container-fluid' style={{padding: 0}}>
        <div className='col-xs-12' style={{padding: 0}}> <Header /> </div>
        <div className='col-xs-3' style={{padding: 0}}> <LeftPane /> </div>
        <div className='col-xs-9' style={{padding: 0}}> <RightPane /> </div>
      </div>
    );
  }
});

module.exports = ChatRep;
