// tutorial13.js
import { browsers, rows } from './model';
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
      console.log("Checking remote");
      ref.on('value', function(snapshot) {
        if((validator && validator(snapshot.val())) || (!validator && snapshot.val())){
          console.log("Received Data");
          resolve(snapshot.val());
        }else{
          console.log("No Data");
          console.log("Start set default");
          ref.set(defaultData).then(function(){
            console.log("Default setted");
            // value event is triggerd before this callback
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
    var initDatabase = () => {
      var id = window.location.hash.split("/").pop() || 'default';
      var ref = database.ref('issues/' + id);

      // this.bindAsObject(ref, 'rows');

      var validateRows = function(data){
        return !!(data && data.xiaomi);
      };
      prepareData(ref, this.state.rows, validateRows).then((data) => {
        // console.log(data);
        this.setState({
          rows: data
        });

        ref.on('value', (snapshot) => {
          // console.log("received", snapshot.val());
          this.setState({
            rows: snapshot.val()
          });
          console.log(snapshot.val());
        });
      });
    };

    window.onhashchange = initDatabase;

    window.addEventListener('onCaseChange',  (e) => {
      var id = window.location.hash.split("/").pop() || 'default';
      var ref = database.ref('issues/' + id);

      console.log('case changed', e.detail);
      var rows = this.state.rows

      var theCase = _.get(rows, [e.detail.device, 'cases', e.detail.browser]);
      theCase.probability = e.detail.next;

      this.setState({
        rows: rows
      });

      ref.set(this.state.rows).then(function(){
        console.log("Saved");
      });
    });

    initDatabase.apply(this)
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
