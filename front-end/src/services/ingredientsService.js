import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/ingredients";

function ingredientUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getIngredients() {
  return http.get(apiEndpoint);
}

export function getIngredient(id) {
  return http.get(ingredientUrl(id));
}

export function saveIngredient(ingredient) {
  if (ingredient._id) {
    http.put(ingredientUrl(ingredient._id));
  } else {
    http.post(apiEndpoint);
  }
}

export function deleteIngredient(id) {
  return http.delete(ingredientUrl(id));
}
