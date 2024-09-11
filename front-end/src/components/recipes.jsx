import React, { Component } from "react";
import { getRecipes } from "../services/recipesService";
import { getIngredients } from "../services/ingredientsService";
import { getCuisines } from "../services/cuisinesService";
import RecipeFilters from "./recipeFilters";
import RecipeCards from "./recipeCards";

class Recipes extends Component {
  state = {
    recipes: [],
    cuisines: [],
    ingredients: [],
    pageSize: 30,
    currentPage: 1,
  };

  async componentDidMount() {
    const { data: recipes } = await getRecipes();
    const { data: cuisines } = await getCuisines();
    const cuisinesWAll = [{ _id: null, name: "All" }, ...cuisines];
    const { data: ingredients } = await getIngredients();
    const ingredientsWAll = [{ _id: null, name: "All" }, ...ingredients];
    this.setState({
      recipes,
      cuisines: cuisinesWAll,
      ingredients: ingredientsWAll,
    });
  }

  handleFilterSelect = (filter) => {
    this.setState({ selectedFilter: filter, currentPage: 1 });
  };
  render() {
    const { cuisines, ingredients, selectedFilter } = this.state;
    return (
      <div className="container shadow rounded-1 bg-white">
        <div className="row flex-wrap">
          <RecipeFilters
            filters={cuisines}
            selectedFilter={selectedFilter}
            onFilterSelect={this.handleFilterSelect}
          />
          <RecipeCards />
        </div>
      </div>
    );
  }
}

export default Recipes;
