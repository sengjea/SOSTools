/** @jsx React.DOM */
var React = require('react');

var Loading = React.createClass({
  render: function() {
    return (
      <div className="cssload-loader-inner">
        <div className="cssload-cssload-loader-line-wrap-wrap">
          <div className="cssload-loader-line-wrap"></div>
        </div>
        <div className="cssload-cssload-loader-line-wrap-wrap">
          <div className="cssload-loader-line-wrap"></div>
        </div>
        <div className="cssload-cssload-loader-line-wrap-wrap">
          <div className="cssload-loader-line-wrap"></div>
        </div>
        <div className="cssload-cssload-loader-line-wrap-wrap">
          <div className="cssload-loader-line-wrap"></div>
        </div>
        <div className="cssload-cssload-loader-line-wrap-wrap">
          <div className="cssload-loader-line-wrap"></div>
        </div>
      </div>
    );
  }
});

module.exports = Loading;
