import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/header';
import Container from './components/Container/container';

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
