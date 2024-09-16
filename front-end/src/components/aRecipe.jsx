import React from "react";
import Joi from "joi-browser";
import _ from "lodash";
import { getIngredients } from "../services/ingredientsService";
import { getCategories } from "../services/categoriesService";
import { getRecipe } from "../services/recipesService";
import { getUnits } from "../services/unitsService";
import { getCuisines } from "../services/cuisinesService";
import Form from "./common/form";
import { getDirections } from "../services/directionsService";

class ARecipe extends Form {
  state = {
    data: {
      name: "",
      description: "",
      servings: "",
      cuisine: "",
      pic: "",

      recipeIngredients: [],
      directions: [],
      newDirection: "",

      newIngredient: "",
      category: "",
    },
    cuisines: [],
    allIngredients: [],
    units: [],
    categories: [],
    editing: false,
    errors: {},
  };

  schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    servings: Joi.number().required(),
    cuisine: Joi.required(),
    pic: Joi.required(),
    directions: Joi.required(),
    newDirection: Joi.string().required(),
  };

  async componentDidMount() {
    await this.populateRecipe();
    await this.populateSelects();
  }

  async populateRecipe() {
    try {
      const recipeId = this.props.match.params._id;
      if (recipeId === "new-recipe") {
        this.onEdit();
        return;
      }
      const { data: recipe } = await getRecipe(recipeId);
      let { data: directions } = await getDirections(recipeId);
      directions = _.orderBy(directions, "step", "asc");
      this.setState({ data: recipe, directions });
    } catch (ex) {
      if (ex.response && ex.response.state === 404)
        this.props.history.replace("/notFound");
    }
  }

  async populateSelects() {
    const { data: cuisines } = await getCuisines();
    const { data: categories } = await getCategories();
    const { data: allIngredients } = await getIngredients();
    const { data: units } = await getUnits();
    this.setState({ cuisines, categories, allIngredients, units });
  }

  async onEdit() {
    this.setState({ editing: true });
  }

  async handleSubmitNewIngredient() {}

  handleSubmitNewDirection = () => {
    const { directions, newDirection } = this.state.data;

    const { error } = Joi.validate(newDirection, this.schema.newDirection);
    if (error) return;
    directions.push({
      step: directions ? directions.length + 1 : 1,
      name: newDirection,
    });
    this.setState({ directions, newDirection: "" });
  };

  doSubmit = async () => {
    const { data, cuisines, allIngredients, units, categories } = this.state;
  };

  render() {
    const {
      name,
      description,
      servings,
      cuisine,
      pic,
      recipeIngredients,
      directions,
      newIngredient,
    } = this.state.data;
    const { allIngredients, units, cuisines, categories, editing } = this.state;
    const nextDirection = directions ? directions.length + 1 + "." : "1.";

    return (
      <div className="container shadow rounded-1 bg-white py-4 px-5 my-4">
        {!editing && (
          <React.Fragment>
            {this.renderTitle(name)}
            <img src={pic} alt={description}></img>
            <div className="fs-6">{cuisine.name}</div>
            <div className="fs-6">{description}</div>
            <div className="fs-6">{servings}</div>
            <div className="fs-6">{recipeIngredients}</div>
          </React.Fragment>
        )}
        {editing && (
          <React.Fragment>
            <div className="col">
              {this.renderInput("name", "Name")}
              {this.renderSelect("cuisine", "Cuisine", cuisines)}
              {this.renderTextarea("description", "Description")}
              {this.renderInput("servings", "Servings")}
              {/* {this.renderSelect("ingredient", "Ingredient", allIngredients)} */}
              <div className="row">{this.renderInput("newIngredient")}</div>
              <div className="fs-3 mt-5">Directions</div>
              {directions &&
                directions.map((direction, index) => (
                  <div key={direction._id}>
                    {this.renderInput(
                      "directions",
                      index + 1 + ".",
                      "text",
                      index
                    )}
                  </div>
                ))}
              <div className="d-flex">
                {this.renderInput("newDirection", nextDirection)}
                <button
                  className="btn btn-dark m-4"
                  onClick={this.handleSubmitNewDirection}
                >
                  Add direction
                </button>
              </div>
            </div>
            <div className="col"></div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ARecipe;
