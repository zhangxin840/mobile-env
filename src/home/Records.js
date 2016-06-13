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
      issues: {}
    };
  },
  componentWillMount: function() {
    var ref = database.ref('issues');
    ref.on('value', (snapshot) => {
      var issues = snapshot.val();
      var cases = getDefaultCases();
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
        issues: issues
      });

      console.log(issues);
    });
  },
  render: function() {
    var list = [];

    for(var key in this.state.issues){
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
