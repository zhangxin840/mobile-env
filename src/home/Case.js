import React, { Component } from 'react';
import _ from 'lodash';

var probabilityNames = {
  "-1": "+", // Known
  "0": "正常",
  "1": "极少",
  "2": "偶发",
  "3": "必现"
};

var probalitiesLoop = [-1, 3, 2, 0];

var Case = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  onClick: function() {
    var getNextValue = function(loop, val){
      var current = loop.indexOf(val);
      var nextPosition = (current >= (loop.length - 1)) ? 0 : (current + 1);

      return loop[nextPosition];
    };

    var next = getNextValue(probalitiesLoop, this.props.data.probability);

    var evt = new CustomEvent('onCaseChange', {
      detail: {
        device: this.props.device,
        browser: this.props.browser,
        data: next
      }
    });

    window.dispatchEvent(evt);
  },
  render: function() {
    return (
      <span onClick={this.onClick} className={"cell case " + "probability_" + this.props.data.probability}>
        {probabilityNames[this.props.data.probability]}
      </span>
    );
  }
});

export { Case };
