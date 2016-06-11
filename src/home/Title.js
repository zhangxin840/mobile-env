import React, { Component } from 'react';
import _ from 'lodash';

var Title = React.createClass({
  getInitialState: function() {
    return {title: window.location.hash.split("/").pop() || 'default'};
  },
  componentDidMount: function() {
    window.onpopstate = () => {
      var id = window.location.hash.split("/").pop();
      this.setState({title: id});
    }
  },
  onInputChange: function(e) {
    this.setState({title: e.target.value});
  },
  onClick: function(e) {
    // history.pushState({}, "", "/#/issues/" + this.state.title);
    window.location.hash = "/issues/" + this.state.title;
  },
  render: function() {
    return (
      <h1 className="title">
        Issue ID:
        <input onChange={ this.onInputChange } value={ this.state.title } />
        <button onClick={ this.onClick }>Get！</button>
      </h1>
    );
  }
});



export { Title };
