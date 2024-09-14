import React from "react";
import Joi from "joi-browser";
import { getRecipe } from "../services/recipesService";
import { getUnits } from "../services/unitsService";
import { getCuisines } from "../services/cuisinesService";
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
    recipeIngredients: [],
    directions: [],
    allIngredients: [],
    units: [],
    cuisines: [],
    editing: false,
    errors: {},
  };

  schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    servings: Joi.number().required().max(2),
    cuisine: Joi.required(),
    pic: Joi.required(),
  });

  async componentDidMount() {
    await this.populateRecipe();
  }

  async populateRecipe() {
    try {
      const recipeId = this.props.match.params._id;
      const { data: recipe } = await getRecipe(recipeId);
      this.setState({ data: recipe });
    } catch (ex) {
      if (ex.response && ex.response.state === 404)
        this.props.history.replace("/notFound");
    }
  }

  async populateCuisinesUnits() {
    const { data: cuisines } = await getCuisines();
    const { data: units } = await getUnits();
    this.setState({ cuisines, units });
  }

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
