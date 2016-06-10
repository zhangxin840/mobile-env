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
        <span key={key} className="cell browser">
          {this.state.browsers[key].name}
        </span>
      );
    }

    return (
      <div className="row">
        <span className="spacer"> </span>
        <div className="wrapper browsers">
          {browsers}
        </div>
      </div>
    );
  }
});

var Case = React.createClass({
  getInitialState: function() {
    return {data: this.props.data || {
      "probability": -1
    }} ;
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <span className="cell case">
        {this.state.data.probability}
      </span>
    );
  }
});

var Row = React.createClass({
  getInitialState: function() {
    return {
      browsers: browsers,
      device: this.props.device,
      name: this.props.data.name,
      cases: this.props.data.cases
    };
  },
  componentDidMount: function() {
  },
  render: function() {
    var cases = [];

    for(var key in this.state.browsers){
      cases.push(
        <Case key={this.state.device + "-" + key} data={this.state.cases[key]} />
      );
    }

    return (
      <div className="row">
        <span className="spacer name">{this.state.name}</span>
        <div className="wrapper cases">
          {cases}
        </div>
      </div>
    );
  }
});

var Devices = React.createClass({
  getInitialState: function() {
    return {devices: devices};
  },
  componentDidMount: function() {
  },
  render: function() {
    var rows = [];

    for(var key in this.state.devices){
      rows.push(
        <Row key={key} device={key} data={this.state.devices[key]}/>
      );
    }

    return (
      <div>{rows}</div>
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
        <Devices />
      </section>
    );
  }
});

export { Chart };
