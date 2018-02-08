
import React, { Component } from 'react';
import './App.css';
import Header from '../Header/header';
import Container from '../Container/container';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Header title="Let's Get Fit" />
      	<Container />
      </div>
    );
  }
}

export default App;

