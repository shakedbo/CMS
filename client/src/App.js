import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import Home from "./Componenets/Home/Home";


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;