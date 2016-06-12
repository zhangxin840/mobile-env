import React, { Component } from 'react';
import { Chart } from './Chart';
import { Search } from './Search';
import { Records } from './Records';

export default class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <article className="container">
        <section className="header">
          <h2>
            <a target="_blank" href="http://mp.weixin.qq.com/s?__biz=MzIzMDI3MTAzMA==&mid=2247483681&idx=1&sn=cffc82ffb3e0baf628a818152e141e01">关于移动端环境表</a>
          </h2>
        </section>
        <Search />
        <Chart />
        <Records />
      </article>
    );
  }
}
