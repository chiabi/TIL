import React, { Component } from 'react';
import AppTemplate from './AppTemplate';
import CounterContainer from 'containers/CounterContainer';
import Todos from './Todos';

class App extends Component {
  render() {
    return (
      <AppTemplate
        counter={<CounterContainer />}
        todos={<Todos />}
      />
    );
  }
}

export default App;
