import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import ShoppingList from "./components/shoppingList";
import ARecipe from "./components/aRecipe";
import NotFound from "./components/notFound";
import Group from "./components/group";
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
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <Route
            path="/shopping-list"
            render={() => {
              if (user) return <ShoppingList />;
              else return <Redirect to="/log-in" />;
            }}
          />
          <Route
            path="/group"
            render={() => {
              if (user) return <Group user={user} />;
              else return <Redirect to="/log-in" />;
            }}
          />
          <Route path="/recipes/:_id" component={ARecipe} />
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
