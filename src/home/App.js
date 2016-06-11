import React, { Component } from 'react';
import { Chart } from './Chart';
import { Title } from './Title';

export default class App extends Component {
  render() {
    return (
      <article>
        <Title />
        <Chart />
      </article>
    );
  }
}
