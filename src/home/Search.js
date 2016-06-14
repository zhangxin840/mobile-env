import React, { Component } from 'react';
import _ from 'lodash';

var Search = React.createClass({
  getInitialState: function() {
    return {id: window.location.hash.split("/").pop()};
  },
  componentDidMount: function() {
    window.onpopstate = () => {
      var id = window.location.hash.split("/").pop();
      this.setState({id: id});
    }
  },
  onInputChange: function(e) {
    this.setState({id: e.target.value});
  },
  onSearch: function(e) {
    // history.pushState({}, "", "/#/issues/" + this.state.title);
    window.location.hash = "/issues/" + (this.state.id || "default");
  },
  onSave: function(e) {
    var evt = new CustomEvent('onSaveChart', {
      detail: {}
    });
    window.dispatchEvent(evt);
  },
  render: function() {
    return (
      <div className="search">
        <span className="label">Issue ID:</span>
        <input className="idInput" onChange={ this.onInputChange } value={ this.state.id === 'default' ? '' : this.state.id } />
        <button className="" onClick={ this.onSearch }>创建 / 查询</button>
        <button className="" onClick={ this.onSave }>保存</button>
      </div>
    );
  }
});



export { Search };
