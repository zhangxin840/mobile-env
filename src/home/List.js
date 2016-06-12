import React, { Component } from 'react';
import _ from 'lodash';
import { database } from './database';


var List = React.createClass({
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
    var list = [];

    for(var key in this.state.issues){
      list.push(
        <li key={key} className="issue">
          <a href={"#/issues/" + key}>{key}</a>
          <span className="description">
            {
              this.state.issues[key].description.substring(0, 30) + ((this.state.issues[key].description.length > 30) ? "..." : "")
            }
          </span>
        </li>
      );
    }

    return (
      <div className="list">
        <h2>Recorded issues:</h2>
        <ul className="">
          {list}
        </ul>
      </div>
    );
  }
});

export { List };
