import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./pagination";
import { paginate } from "../utility/paginate";
import { getRecipes } from "../services/recipesService";
import { getIngredients } from "../services/ingredientsService";
import { getTags } from "../services/tagsService";
import RecipeFilters from "./recipeFilters";
import RecipeCards from "./recipeCards";

class Recipes extends Component {
  state = {
    recipes: [],
    tags: [],
    pageSize: 30,
    currentPage: 1,
    selectedFilter: null,
  };

  async componentDidMount() {
    const { data: recipes } = await getRecipes();
    const { data: tags } = await getTags();
    const tagsWAll = [{ _id: null, name: "All" }, ...tags];
    this.setState({
      recipes,
      tags: tagsWAll,
    });
  }

  handleFilterSelect = (tag) => {
    this.setState({ selectedFilter: tag, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedFilter,
      recipes: allRecipes,
    } = this.state;

    const filtered = allRecipes;
    const sorted = _.orderBy(filtered, "name", "asc");
    const recipes = paginate(sorted, currentPage, pageSize);
    return { itemsCount: filtered.length, data: recipes };
  };

  hanglePageChange = () => {};

  render() {
    const { tags, selectedFilter, pageSize, currentPage } = this.state;
    const { itemsCount, data: recipes } = this.getPagedData();

    return (
      <div className="container rounded-1 my-4">
        <div className="row flex-wrap">
          <RecipeFilters
            filters={tags}
            selectedFilter={selectedFilter}
            onFilterSelect={this.handleFilterSelect}
          />
          <RecipeCards data={recipes} />
          {/* <Pagination
            itemsCount={itemsCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          /> */}
        </div>
      </div>
    );
  }
}

export default Recipes;
