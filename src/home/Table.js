import React, { Component } from 'react';
import _ from 'lodash';
import { Case } from './Case';

var probabilityNames = {
  "-1": "+", // Known
  "0": "正常",
  "1": "极少",
  "2": "偶发",
  "3": "必现"
};

var probalitiesLoop = [-1, 3, 2, 0];

var Browsers = React.createClass({
  getInitialState: function() {
    return {browsers: this.props.data};
  },
  componentDidMount: function() {
  },
  render: function() {
    var browsers = [];

    for(var key in this.props.data){
      browsers.push(
        <span key={key} className="cell browser">
          {this.props.data[key].name}
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

var Row = React.createClass({
  getInitialState: function() {
    return {
      browsers: this.props.browsers,
      device: this.props.device,
      name: this.props.data.name,
      cases: this.props.data.cases
    };
  },
  componentDidMount: function() {

  },
  render: function() {
    var cases = [];
    // console.log("rendering row:", this.props.data);

    for(var key in this.props.browsers){
      cases.push(
        <Case key={this.props.device + "-" + key} browser={key} device={this.props.device} data={this.props.data.cases[key]} />
      );
    }

    return (
      <div className="row">
        <span className="spacer name">{this.props.data.name}</span>
        <div className="wrapper cases">
          {cases}
        </div>
      </div>
    );
  }
});

var Rows = React.createClass({
  getInitialState: function() {
    return {
      rows: this.props.rows,
      browsers: this.props.browsers
    };
  },
  componentDidMount: function() {
  },
  render: function() {
    var rows = [];

    for(var key in this.props.rows){
      rows.push(
        <Row key={key} device={key} browsers={this.props.browsers} data={this.props.rows[key]}/>
      );
    }

    rows.sort((a, b) => {
      return this.props.devices[b.props.device].ratio - this.props.devices[a.props.device].ratio;
    });

    console.log(rows[0]);

    return (
      <div className="rows">
        {rows}
      </div>
    );
  }
});

var Table = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div className="table">
        <Browsers data={this.props.browsers} />
        <Rows {...this.props} />
      </div>
    );
  }
});

export { Table };
