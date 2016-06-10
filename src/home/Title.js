import React, { Component } from 'react';
import _ from 'lodash';

var title = "HFE-3212";

var Title = React.createClass({
  getInitialState: function() {
    return {title: title};
  },
  componentDidMount: function() {

  },
  render: function() {
    return (
      <h1 className="title">
        Issue ID: {this.state.title}
      </h1>
    );
  }
});



export { Title };
