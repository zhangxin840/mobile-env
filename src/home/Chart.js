import React, { Component } from 'react';
import _ from 'lodash';
import { browsers, tableData, devices } from './model';
import { database } from './database';
import { Table } from './Table';

var prepareData = function(ref, defaultData, validator){
  var promise = new Promise(function(resolve, reject){
      // console.log("Checking remote");
      ref.once('value', function(snapshot) {
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
  getInitialState: function() {
    return {
      id: getId(),
      ref: database.ref('issues/' + (getId() || 'default')),
      browsers: browsers,
      rows: tableData,
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
        rows: tableData,
        description: ""
      });

      var validateChart = function(data){
        return !!(data && data.rows && data.rows.xiaomi);
      };

      var defaultData = {rows: tableData, description: ""};

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
      var theCase = _.get(rows, [e.detail.device, e.detail.browser]);
      theCase.probability = e.detail.data;

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
        <h3 className="legend">兼容性缺陷分布 {this.state.id ? "-" : ""} {this.state.id}</h3>
        <Table browsers={browsers} devices={devices} rows={this.state.rows} type="issues"/>
        <h3 className="label">Description</h3>
        <textarea onChange={this.onDescriptionChange} onBlur={this.saveChart} className="description" value={this.state.description}>
        </textarea>
      </section>
    );
  }
});

export { Chart };
