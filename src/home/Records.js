import React, { Component } from 'react';
import _ from 'lodash';
import { database } from './database';
import { browsers, tableData, devices } from './model';
import { Table } from './Table';

var initRecordTableData = function(){
  var i, j;
  var recordTable = {};

  for (i in devices) {
    recordTable[i] = {}

    for (j in browsers) {
      recordTable[i][j] = {
        "count": 0
      };
    }
  }

  return recordTable;
};

var Records = React.createClass({
  getInitialState: function() {

    return {
      recordTable: initRecordTableData(),
      issues: {}
    };
  },
  componentWillMount: function() {
    var ref = database.ref('issues');
    ref.on('value', (snapshot) => {
      var issues = snapshot.val();
      var recordTable = initRecordTableData();
      var theTable, theCase;

      for(var id in issues){
        theTable = issues[id].rows || {};

        for(var i in devices){
          for(var j in browsers){
             theCase = theTable[i] && theTable[i][j] || {};

             if(theCase.probability >= 1){
               recordTable[i][j].count++;
             }
          }
        }
      }


      this.setState({
        recordTable: recordTable,
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
        <Table className="recordTable" type="records" devices={devices} browsers={browsers} rows={this.state.recordTable}/>
        <ul className="list">
          {list}
        </ul>
      </div>
    );
  }
});

export { Records };
