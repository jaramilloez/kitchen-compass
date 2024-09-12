import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/notFound";
import Profile from "./components/profile";
import { getCurrentUser } from "./services/authService";
import SignUp from "./components/signUp";
import LogIn from "./components/logIn";
import Home from "./components/home";
import NavBar from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

class App extends Component {
  state = {};
  async componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
