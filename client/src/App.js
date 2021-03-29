import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";


import Home from "./Componenets/Home/Home";
import Navbar from "./Componenets/Navbar/Navbar";
import Login from "./Componenets/Login/Login";
import Register from "./Componenets/Register/Register";


function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;