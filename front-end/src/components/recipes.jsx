import React, { Component } from "react";
import Pagination from "./pagination";
import { paginate } from "../utility/paginate";
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

  handleFilterSelect = (cuisine) => {
    this.setState({ selectedCuisine: cuisine, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedCuisine,
      recipes: allRecipes,
    } = this.state;

    const filtered =
      selectedCuisine && selectedCuisine._id
        ? allRecipes.filter(
            (recipe) => recipe.cuisine._id === selectedCuisine._id
          )
        : allRecipes;
    const sorted = _.orderBy(filtered, "name", "asc");
    const recipes = paginate(sorted, currentPage, pageSize);
    return { itemsCount: filtered.length, data: recipes };
  };

  render() {
    const { cuisines, selectedFilter } = this.state;
    const { itemsCount, data: recipes } = this.getPagedData();

    return (
      <div className="container shadow rounded-1 bg-white my-4">
        <div className="row flex-wrap">
          <RecipeFilters
            filters={cuisines}
            selectedFilter={selectedFilter}
            onFilterSelect={this.handleFilterSelect}
          />
          <RecipeCards data={recipes} />
          <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Recipes;
