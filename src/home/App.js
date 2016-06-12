import React, { Component } from 'react';
import { Chart } from './Chart';
import { Title } from './Title';
import { List } from './List';

export default class App extends Component {
  componentDidMount() {

  }
  
  render() {
    return (
      <article className="container">
        <Title />
        <Chart />
        <List />
      </article>
    );
  }
}
