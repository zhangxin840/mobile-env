// tutorial13.js
import { browsers, rows as defaultRows } from './model';
import React, { Component } from 'react';
import ReactFireMixin from 'reactfire';
import { database } from './database';
import _ from 'lodash';

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

var Case = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data,
    };
  },
  componentDidMount: function() {
  },
  onClick: function() {
    var getNextValue = function(loop, val){
      var current = loop.indexOf(val);
      var nextPosition = (current >= (loop.length - 1)) ? 0 : (current + 1);

      return loop[nextPosition];
    };

    var next = getNextValue(probalitiesLoop, this.props.data.probability);

    var evt = new CustomEvent('onCaseChange', {
      detail: {
        device: this.props.device,
        browser: this.props.browser,
        next: next
      }
    });

    window.dispatchEvent(evt);
  },
  render: function() {
    return (
      <span onClick={this.onClick} className={"cell case " + "probability_" + this.props.data.probability}>
        {probabilityNames[this.props.data.probability]}
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

    console.log("rendering row:", this.props.data);
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

    return (
      <div className="rows">{rows}</div>
    );
  }
});

var prepareData = function(ref, defaultData, validator){
  var promise = new Promise(function(resolve, reject){
      // console.log("Checking remote");
      ref.on('value', function(snapshot) {
        console.log("Reveived Data");
        if((validator && validator(snapshot.val())) || (!validator && snapshot.val())){
          console.log("Valid Data");
          resolve(snapshot.val());
        }else{
          console.log("No valid Data");
          // console.log("Start set default");
          ref.set(defaultData).then(function(){
            // value event is triggerd before this callback
            // console.log("Default setted");
          });
        }
      });
  });

  return promise;
};

var getId = () => {
  return window.location.hash.split("/").pop();
};

var Chart = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      id: getId(),
      ref: database.ref('issues/' + (getId() || 'default')),
      browsers: browsers,
      rows: defaultRows,
      description: ""
    };
  },
  onDescriptionChange: function(e) {
    this.setState({
      description: e.target.value
    });
  },
  saveChart: function(){
    this.state.ref.set({
      rows: this.state.rows,
      description: this.state.description
    }).then(function(){
      console.log("Chart Saved");
    });
  },
  componentWillMount: function() {
    var initChart = () => {
      this.setState({
        id: getId(),
        ref: database.ref('issues/' + (getId() || 'default')),
        rows: defaultRows,
        description: ""
      });

      var validateChart = function(data){
        return !!(data && data.rows && data.rows.xiaomi);
      };

      var defaultData = {rows: defaultRows, description: ""};

      prepareData(this.state.ref, defaultData, validateChart).then((data) => {
        // console.log(data);
        this.setState({
          ...data
        });

        this.state.ref.on('value', (snapshot) => {
          // console.log("received", snapshot.val());
          this.setState({
            ...snapshot.val()
          });
          // console.log(snapshot.val());
        });
      });
    };

    window.onhashchange = initChart;

    window.addEventListener('onCaseChange',  (e) => {
      var rows = this.state.rows;
      var theCase = _.get(rows, [e.detail.device, 'cases', e.detail.browser]);
      theCase.probability = e.detail.next;

      this.setState({
        rows: rows
      });
      this.saveChart();
    });

    initChart.apply(this);
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <section className="chart">
        <h2>Mobile Compatibility Chart {this.state.id ? "-" : ""} {this.state.id}</h2>
        <Browsers data={this.state.browsers} />
        <Rows browsers={this.state.browsers} rows={this.state.rows}/>
        <h3>Description</h3>
        <textarea onChange={this.onDescriptionChange} onBlur={this.saveChart} className="description" value={this.state.description}>
        </textarea>
      </section>
    );
  }
});

export { Chart };
