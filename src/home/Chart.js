import React, { Component } from 'react';
import _ from 'lodash';
import { browsers, devices } from './model';
import { database } from './database';
import { Table } from './Table';

var fillDefaultCases = function(cases){
  var i, j;
  cases = cases || {};

  for (i in devices) {
    cases[i] = cases[i] || {}

    for (j in browsers) {
      cases[i][j] = cases[i][j] || {
        "probability": -1
      };
    }
  }

  return cases;
};

var prepareData = function(ref, defaultData, validator){
  var promise = new Promise(function(resolve, reject){
      // console.log("Checking remote");
      ref.once('value', function(snapshot) {
        var data = snapshot.val();

        console.log("Reveived Data");
        if((validator && validator(data)) || (!validator && data)){
          console.log("Valid Data");
          resolve(data);
        }else{
          console.log("No valid Data");
          ref.set(defaultData).then(function(){
            console.log("Default setted");
            resolve(defaultData);
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
      description: "",
      cases: fillDefaultCases({}),
      loading: true
    };
  },
  onDescriptionChange: function(e) {
    this.setState({
      description: e.target.value
    });
  },
  saveChart: function(){
    this.setState({
      isLoading: true
    });

    this.state.ref.set({
      cases: this.state.cases,
      description: this.state.description
    }).then(() => {
      this.setState({
        isLoading: false
      });
      // console.log("Chart Saved");
    });
  },
  componentWillMount: function() {
    var initChart = () => {
      // Reset state
      this.setState({
        id: getId(),
        ref: database.ref('issues/' + (getId() || 'default')),
        cases: fillDefaultCases({}),
        description: "",
        isLoading: true
      });

      var validateChart = function(data){
        return !!(data && data.cases);
      };

      var defaultData = {cases: fillDefaultCases({}), description: ""};

      prepareData(this.state.ref, defaultData, validateChart).then((data) => {
        // console.log(data);
        fillDefaultCases(data.cases);
        this.setState({
          ...data,
          isLoading: false
        });

        this.state.ref.on('value', (snapshot) => {
          // console.log("received", snapshot.val());
          var data = snapshot.val();
          fillDefaultCases(data.cases);
          this.setState({
            ...data,
            isLoading: false
          });
          // console.log(snapshot.val());
        });
      });
    };

    window.onhashchange = initChart;

    window.addEventListener('onCaseChange',  (e) => {
      var cases = this.state.cases;
      var theCase = _.get(cases, [e.detail.device, e.detail.browser]);
      theCase.probability = e.detail.data;

      this.setState({
        cases: cases
      });
      // this.saveChart();
    });

    window.addEventListener('onSaveChart',  (e) => {
      this.saveChart();
    });

    initChart.apply(this);
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <section className={"chart " + (this.state.isLoading ? "loading" : "")}>
        <img className="loadingImg" src="cube.svg" alt="" />
        <h3 className="legend">兼容性缺陷分布 {(this.state.id && (this.state.id !== 'default')) ? (" - " + this.state.id) : ""} </h3>
        <Table browsers={browsers} devices={devices} cases={this.state.cases} type="issues"/>
        <h3 className="label">Description</h3>
        <textarea onChange={this.onDescriptionChange} className="description" value={this.state.description}>
        </textarea>
      </section>
    );
  }
});

export { Chart };
