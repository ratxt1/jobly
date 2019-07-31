import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Routes from './Routes'
import NavBar from './NavBar'

class App extends Component{
  render(){
    return(
      <div className="App">
        <BrowserRouter>
          <NavBar/>
          <Routes/>
        </BrowserRouter>
      </div>      
    )
  }
}

export default App;
