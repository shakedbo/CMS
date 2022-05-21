import React from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "./Context";
import Home from "./Componenets/Home/Home";
import Navbar from "./Componenets/Navbar/Navbar";
import Login from "./Componenets/Login/Login";
import Register from "./Componenets/Register/Register";
import Logout from './Componenets/Logout/logout';
import Sidebar from "./Componenets/Sidebar/Sidebar";
import ChangeDetails from "./Componenets/Change-Details/ChangeDetails";
import "./App.css";
import ForgotPassword from './Componenets/ForgetPassword/ForgetPassword';
import ResetPassword from './Componenets/ResetPassword/ResetPassword';
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
            <Route exact path="/change-details" component={ChangeDetails}></Route>
            <Route exact path="/login/reset" component = {ForgotPassword}></Route>
            <Route exact path="/reset-password" component = {ResetPassword}></Route>
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