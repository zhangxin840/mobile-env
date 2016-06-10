// tutorial13.js
import { browsers, devices } from './mocks';
import React, { Component } from 'react';

var Browsers = React.createClass({
  getInitialState: function() {
    return {browsers: browsers};
  },
  componentDidMount: function() {
  },
  render: function() {
    var browsers = [];

    for(var key in this.state.browsers){
      browsers.push(
        <span className="cell browser">
          {this.state.browsers[key].name}
        </span>
      );
    }

    return (
      <div className="row">
        <span calssName="spacer"> </span>
        <div className="wrapper browsers">
          {browsers}
        </div>
      </div>
    );
  }
});

var Chart = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <section className="chart">
        <Browsers />
      </section>
    );
  }
});

export { Chart };
