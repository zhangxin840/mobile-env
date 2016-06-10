import React, { Component } from 'react';
import { Chart } from './Chart';
import { Title } from './Title';
import { database } from './database';

export default class App extends Component {
  render() {
    database.ref('users/zx').set({
      username: "zx",
      time: new Date() + ""
    });

    return (
      <article>
        <Title />
        <Chart />
      </article>
    );
  }
}
