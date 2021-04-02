import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "./Context";
import Home from "./Componenets/Home/Home";
import Navbar from "./Componenets/Navbar/Navbar";
import Login from "./Componenets/Login/Login";
import Register from "./Componenets/Register/Register";
import Logout from './Componenets/Logout/logout';
import Sidebar from "./Componenets/Sidebar/Sidebar";

function App() {
  return (
    <div>
      <Provider>

        <Router>
          <Sidebar width={300} height={"100vh"}>
            <h1>Hi1</h1>
            <h1>Hi1</h1>
            <h1>Hi1</h1>
            <h1>Hi1</h1>
          </Sidebar>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/logout" component={Logout}></Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
export default App;