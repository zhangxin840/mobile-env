// tutorial13.js
import { browsers, rows as defaultRows, devices } from './model';
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

var Collection = React.createClass({
  getInitialState: function() {
    return {
      issues: {}
    };
  },
  componentWillMount: function() {
    var ref = database.ref('issues');
    ref.on('value', (snapshot) => {
      this.setState({
        issues: snapshot.val()
      });

      console.log(snapshot.val())
    });
  },
  render: function() {
    return (
      <section className="collection">
      </section>
    );
  }
});

export { Collection };
