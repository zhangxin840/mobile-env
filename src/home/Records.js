import React, { Component } from 'react';
import _ from 'lodash';
import { database } from './database';
import { browsers, devices } from './model';
import { Table } from './Table';

var getDefaultCases = function(){
  var i, j;
  var cases = {};

  for (i in devices) {
    cases[i] = {}

    for (j in browsers) {
      cases[i][j] = {
        "count": 0
      };
    }
  }

  return cases;
};

var Records = React.createClass({
  getInitialState: function() {
    return {
      cases: getDefaultCases(),
      issues: {},
      filtered: {}
    };
  },
  componentWillMount: function() {
    var ref = database.ref('issues');
    ref.on('value', (snapshot) => {
      var cases = getDefaultCases();
      var issues = snapshot.val();

      var issueCases, theCase;

      for(var id in issues){
        issueCases = issues[id].cases || {};

        for(var i in devices){
          for(var j in browsers){
             theCase = issueCases[i] && issueCases[i][j] || {};
             if(theCase.probability >= 1){
               cases[i][j].count++;
             }
          }
        }
      }

      this.setState({
        cases: cases,
        issues: issues,
        filtered: issues
      });

      console.log(issues);
    });

    window.addEventListener('onCaseClick',  (e) => {
      var issues = this.state.issues;
      var filtered = {};
      var issueCases;
      var isEmpty = true;

      for(var id in issues){
        issueCases = issues[id].cases || {};
        if(issueCases[e.detail.device] && issueCases[e.detail.device][e.detail.browser] && issueCases[e.detail.device][e.detail.browser].probability >= 1){
          filtered[id] = issues[id];
          isEmpty = false;
        }
      }

      if(isEmpty){
        filtered = issues;
      }

      this.setState({
        filtered: filtered
      });
    });

  },
  render: function() {
    var list = [];

    for(var key in this.state.filtered){
      list.push(
        <li key={key} className="issue">
          <a className="link" href={"#/issues/" + key}>{key}</a>
          <span className="description">
            {
              this.state.issues[key].description.substring(0, 30) + ((this.state.issues[key].description.length > 30) ? "..." : "")
            }
          </span>
        </li>
      );
    }

    return (
      <div className="records">
        <h2>兼容性缺陷数据统计</h2>
        <Table className="recordTable" type="records" devices={devices} browsers={browsers} cases={this.state.cases}/>
        <ul className="list">
          {list}
        </ul>
      </div>
    );
  }
});

export { Records };
