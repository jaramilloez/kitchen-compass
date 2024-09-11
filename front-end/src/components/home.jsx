import React, { Component } from "react";
import Hero from "./hero";
import Recipes from "./recipes";

class Home extends Component {
  state = {};

  componentDidMount = {};
  render() {
    return (
      <div className="py-4">
        <Hero />
        <Recipes />
      </div>
    );
  }
}

export default Home;
