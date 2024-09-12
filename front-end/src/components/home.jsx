import React, { Component } from "react";
import Hero from "./hero";
import Recipes from "./recipes";

class Home extends Component {
  state = {};

  componentDidMount = {};
  render() {
    return (
      <React.Fragment>
        <Hero />
        <Recipes />
      </React.Fragment>
    );
  }
}

export default Home;
