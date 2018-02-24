import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigations/navigation';
import Header from './components/headers/header';
import Container from './components/containers/container';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
      	<Container />
      </div>
    );
  }
}

export default App;
