import React from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "./Context";
import Home from "./Componenets/Home/Home";
import Navbar from "./Componenets/Navbar/Navbar";
import Login from "./Componenets/Login/Login";
import Register from "./Componenets/Register/Register";
import Logout from './Componenets/Logout/logout';
import Sidebar from "./Componenets/Sidebar/Sidebar";
import Activity from "./Componenets/Activity/Activity";
import Scanning from "./Componenets/Scanning/Scanning";
import "./App.css";
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Router>
        <Provider>
          <Sidebar width={150} height={"100vh"}>
          </Sidebar>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/logout" component={Logout}></Route>
            <Route exact path="/my-activity" component={Activity}></Route>
            <Route exact path="/scanning" component={Scanning}></Route>
            <Route path='*' render={() =>
            (
              <Redirect to="/" />
            )
            } />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}
export default App;