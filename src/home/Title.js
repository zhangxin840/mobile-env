import React, { Component } from 'react';
import _ from 'lodash';

var Title = React.createClass({
  getInitialState: function() {
    return {title: window.location.hash.split("/").pop()};
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
      <div className="title">
        <span className="label">Issue ID:</span>
        <input class="idInput" onChange={ this.onInputChange } value={ this.state.title } />
        <button class="search" onClick={ this.onClick }>Get</button>
      </div>
    );
  }
});



export { Title };
