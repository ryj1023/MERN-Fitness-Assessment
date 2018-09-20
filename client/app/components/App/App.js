
import React, { Component } from 'react';
import './App.css';
import Header from '../Header/header';
import Container from '../containers/Container';
import Home from '../'

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Header/>
      	<Container />
      </div>
    );
  }
}

export default App;

