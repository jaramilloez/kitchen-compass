import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/recipes";

function recipeUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipes() {
  return http.get(apiEndpoint);
}

export function getRecipe(id) {
  return http.get(recipeUrl(id));
}

export function saveRecipe(recipe) {
  const body = { ...recipe };
  delete body._id;

  if (recipe._id) {
    http.put(recipeUrl(recipe._id), body);
  } else {
    http.post(apiEndpoint, body);
  }
}

export function deleteRecipe(id) {
  return http.delete(recipeUrl(id));
}
