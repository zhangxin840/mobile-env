// tutorial13.js
import { browsers, rows } from './model';
import React, { Component } from 'react';
import ReactFireMixin from 'reactfire';
import { database } from './database';

var Browsers = React.createClass({
  getInitialState: function() {
    return {browsers: this.props.data};
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
    return {data: this.props.data};
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

    for(var key in this.state.rows){
      rows.push(
        <Row key={key} device={key} browsers={this.state.browsers} data={this.state.rows[key]}/>
      );
    }

    return (
      <div>{rows}</div>
    );
  }
});

var prepareData = function(ref, defaultData, validator){
  var promise = new Promise(function(resolve, reject){
      ref.on('value', function(snapshot) {
        if((validator && validator(snapshot.val())) || (!validator && snapshot.val())){
          console.log("Have Data");
          resolve(snapshot.val());
        }else{
          // console.log("No Data");
          // console.log("Start set default");
          ref.set(defaultData).then(function(){
            console.log("Default setted");
          });
        }
      });
  });

  return promise;
};

var Chart = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      browsers: browsers,
      rows: rows
    };
  },
  componentWillMount: function() {
    // database.ref('charts/test1/rows').set(this.state.rows);
    // this.bindAsObject(ref, 'rows');
    var ref = database.ref('charts/test5/rows');

    var validateRows = function(data){
      return !!(data && data.xiaomi);
    };

    this.bindAsObject(ref, 'rows');

    ref.on('value', function(snapshot) {
      console.log(snapshot.val())
    });

    // prepareData(ref, this.state.rows, validateRows).then((data) => {
    //   console.log(data);
    //
    // });
  },
  componentDidMount: function() {
    database.ref('users/zx').set({
      username: "zx",
      time: new Date() + ""
    });
  },
  render: function() {
    return (
      <section className="chart">
        <Browsers data={this.state.browsers} />
        <Rows browsers={this.state.browsers} rows={this.state.rows}/>
      </section>
    );
  }
});

export { Chart };
