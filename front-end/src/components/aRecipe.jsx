import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Joi from "joi";
import _ from "lodash";
import { getIngredients } from "../services/ingredientsService";
import { getCategories } from "../services/categoriesService";
import { getRecipe, saveRecipe } from "../services/recipesService";
import { getUnits } from "../services/unitsService";
import { getTags } from "../services/tagsService";
import Form from "./common/form";
import { getDirections, saveDirection } from "../services/directionsService";

class ARecipe extends Form {
  state = {
    data: {
      name: "",
      description: "",
      servings: "",
      pic: "",

      recipeTags: [],
      recipeIngredients: [],
      directions: [],
    },
    allTags: [],
    allIngredients: [],
    units: [],
    categories: [],
    editing: true,
    errors: {},
  };

  schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    servings: Joi.number().required(),
    pic: Joi.required(),

    recipeTags: Joi.required(),
    recipeIngredients: Joi.required(),
    directions: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string().allow(null).label("_id"),
          recipeId: Joi.string().allow(null).label("recipeId"),
          step: Joi.string().required().label("step"),
          name: Joi.string().required().label("direction"),
        })
      )
      .required(),
  });

  async componentDidMount() {
    await this.populateRecipe();
    await this.populateSelects();
  }

  async populateRecipe() {
    try {
      const recipeId = this.props.match.params._id;
      if (recipeId === "new-recipe") {
        this.handleEditingToggle();
        return;
      }
      const { data: recipe } = await getRecipe(recipeId);
      let { data: directions } = await getDirections(recipeId);
      directions = _.orderBy(directions, "step", "asc");
      this.setState({
        data: {
          name: recipe.name,
          description: recipe.description,
          servings: recipe.servings,
          pic: recipe.pic,

          recipeTags: [],
          recipeIngredients: [],
          directions: directions,
        },
      });
    } catch (ex) {
      if (ex.response && ex.response.state === 404)
        this.props.history.replace("/notFound");
    }
  }

  async populateSelects() {
    const { data: allTags } = await getTags();
    const { data: categories } = await getCategories();
    const { data: allIngredients } = await getIngredients();
    const { data: units } = await getUnits();
    this.setState({ allTags, categories, allIngredients, units });
  }

  handleNewDirection = () => {
    const { directions } = this.state.data;
    directions.push({
      _id: null,
      recipeId: null,
      name: "",
      step: `${directions.length + 1}.`,
    });
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        directions,
      },
    }));
  };

  handleDeletingDirection = (index) => {
    const { directions } = this.state.data;
    directions.splice(index, 1);
    for (let i = 0; i < directions.length; i++) {
      directions[i] = {
        ...directions[i],
        step: `${i + 1}.`,
      };
    }
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        directions,
      },
    }));
  };

  handleSubmitNewTag = () => {};

  handleEditingToggle = () => {
    this.setState({ editing: this.state.editing ? false : true });
  };

  doSubmit = async () => {
    const { name, description, servings, pic, directions } = this.state.data;
    try {
      const { data: recipe } = await saveRecipe({
        _id: this.props.match.params._id,
        name: name,
        description: description,
        servings: servings,
        pic: pic,
      });
      for (const direction of directions) {
        saveDirection({
          _id: direction._id,
          recipeId: recipe._id,
          name: direction.name,
          step: direction.step,
        });
      }
    } catch (er) {
      console.log(er);
    }
    this.handleEditingToggle();
  };

  render() {
    const { name, description, servings, pic, recipeIngredients, directions } =
      this.state.data;
    const { allIngredients, units, allTags, categories, editing } = this.state;

    return (
      <div className="container my-4">
        {!editing ? (
          <React.Fragment>
            <div className="row justify-content-end">
              <button
                className="editBtn btn w-auto fs-5 d-flex align-items-center"
                onClick={this.handleEditingToggle}
              >
                <div className="overflow-hidden">
                  <div className="editBtnText overflow-hidden position-relative">
                    Edit
                  </div>
                </div>
                <FontAwesomeIcon icon={faPencil} className="fa-xs ps-1" />
              </button>
            </div>
            <div className="row">
              <div className="col-12 col-lg-6">
                <img
                  src={`data:image/jpg;base64,${pic}`}
                  alt={description}
                  className="img-fluid"
                ></img>
              </div>
              <div className="col-12 col-lg-6">
                {this.renderTitle(name)}
                <div className="fs-4 mt-3 fw-bold">Description</div>
                <div className="fs-5">{description}</div>
                <div className="fs-5 mt-3">Serves {servings}</div>
              </div>
            </div>
            <div className="row fs-3">{recipeIngredients}</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="row">
              <div className="col-12 col-lg-6">
                <img
                  src={`data:image/jpg;base64,${pic}`}
                  alt={description}
                  className="img-fluid"
                ></img>
              </div>
              <div className="col-12 col-lg-6">
                {this.renderInput("name", "Name")}
                <div className="row align-items-center">
                  <div className="col-4">
                    {this.renderSelect("tag", "Tag", allTags)}
                  </div>
                  <div className="col-4">
                    <button
                      className="bgBrown shadowHover btn"
                      onClick={() => this.handleSubmitNewTag}
                    >
                      Add tag
                    </button>
                  </div>
                </div>
                {this.renderTextarea("description", "Description")}
                <div className="row">
                  <div className="col-4">
                    {this.renderInput("servings", "Servings", "number")}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <div className="row">
                  <div className="fs-4 mt-3 fw-bold">Ingredients</div>
                </div>
                {this.renderSelect("ingredient", "Ingredient", allIngredients)}
                <div className="row">
                  <div className="fs-4 mt-3 fw-bold">Directions</div>
                </div>
                {directions.map((direction, index) => (
                  <div key={direction.step} className="row">
                    <div className="col">
                      {this.renderInput(
                        "directions",
                        direction.step,
                        "text",
                        index
                      )}
                    </div>
                    {directions.length > 1 && (
                      <button
                        className="deleteBtn btn w-auto fs-5 d-flex align-items-center"
                        onClick={() => this.handleDeletingDirection(index)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="fa-xs ps-1"
                        />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="bgBrown shadowHover btn"
                  onClick={this.handleNewDirection}
                >
                  Add direction
                </button>
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="col-1">
                <button
                  className="cancelBtn btn w-100"
                  onClick={this.handleEditingToggle}
                >
                  Cancel
                </button>
              </div>
              <div className="col-1">{this.renderSubmit("Save")}</div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ARecipe;
