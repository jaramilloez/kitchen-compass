import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/recipeIngredients";

function recipeIngredientUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipeIngredients(recipeId) {
  return http.get(recipeIngredientUrl(recipeId));
}

export function saveRecipeIngredient(recipeIngredient) {
  const body = { ...recipeIngredient };
  delete body._id;

  if (recipeIngredient._id) {
    http.put(recipeIngredientUrl(recipeIngredient._id), body);
  } else {
    http.post(apiEndpoint, body);
  }
}

export function deleteRecipeIngredient(id) {
  return http.delete(recipeIngredientUrl(id));
}
