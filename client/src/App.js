import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Dashboard } from "./components/DashBoard/DashBoard.js";
import { Login } from "./components/Login/Login.js";
import { Signup } from "./components/Signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import "./App.css";
import "./bootstrap/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-content">
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
