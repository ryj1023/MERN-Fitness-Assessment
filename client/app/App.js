import React, { Component } from 'react';
import './App.css';
import Header from './components/headers/header';
import Container from './components/containers/container';

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
