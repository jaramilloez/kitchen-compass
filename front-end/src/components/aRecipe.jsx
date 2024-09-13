import React from "react";
import Form from "./common/form";

class ARecipe extends Form {
  state = {
    data: {
      name: "",
      description: "",
      servings: "",
      cuisine: "",
      pic: "",
    },
    recipeIngredients: "",
    directions: "",
    allIngredients: "",
    units: "",
    editing: false,
    errors: {},
  };
  render() {
    const { name, description, servings, cuisine, pic } = this.state.data;
    const { recipeIngredients, directions, allIngredients, units, editing } =
      this.state;
    return (
      <div className="container shadow rounded-1 bg-white">
        {!editing && (
          <React.Fragment>
            {this.renderTitle(name)}
            <img src={pic} alt={description}></img>
            <div className="fs-6">{cuisine.name}</div>
            <div className="fs-6">{description}</div>
            <div className="fs-6">{servings}</div>
            <div className="fs-6">{recipeIngredients}</div>
            <div className="fs-6">{directions}</div>
          </React.Fragment>
        )}
        {editing && (
          <form>
            {this.renderInput(name, name)}
            {this.renderInput(description, description)}
            {this.renderInput(servings, servings)}
          </form>
        )}
      </div>
    );
  }
}

export default ARecipe;
