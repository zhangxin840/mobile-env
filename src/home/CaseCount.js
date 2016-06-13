import React, { Component } from 'react';
import _ from 'lodash';

var CaseCount = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  onClick: function() {
    var evt = new CustomEvent('onCaseClick', {
      detail: {
        device: this.props.device,
        browser: this.props.browser,
        data: this.props.data.count
      }
    });

    window.dispatchEvent(evt);
  },
  render: function() {
    return (
      <span onClick={this.onClick} className={"cell case " + "count " + this.props.data.count}>
        {this.props.data.count}
      </span>
    );
  }
});

export { CaseCount };
