import React, { Component } from 'react';
import _ from 'lodash';
import { Case } from './Case';
import { CaseCount } from './CaseCount';

var Browsers = React.createClass({
  getInitialState: function() {
    return {};
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
    return {};
  },
  componentDidMount: function() {

  },
  render: function() {
    var cases = [];
    // console.log("rendering row:", this.props.data);

    for(var key in this.props.browsers){
      if(this.props.type === 'issues'){
        cases.push(
          <Case key={this.props.device + "-" + key} browser={key} device={this.props.device} data={this.props.rowCases[key]} />
        );
      }else{
        cases.push(
          <CaseCount key={this.props.device + "-" + key} browser={key} device={this.props.device} data={this.props.rowCases[key]} />
        );
      }
    }

    return (
      <div className="row">
        <span className="spacer name">{this.props.name}</span>
        <div className="wrapper cases">
          {cases}
        </div>
      </div>
    );
  }
});

var Rows = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  render: function() {
    var rows = [];

    for(var key in this.props.devices){
      rows.push(
        <Row key={key} device={key} type={this.props.type} browsers={this.props.browsers} name={this.props.devices[key].name} rowCases={this.props.cases[key]}/>
      );
    }

    rows.sort((a, b) => {
      return this.props.devices[b.props.device].ratio - this.props.devices[a.props.device].ratio;
    });

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
