import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/recipeTags";

function recipeTagsUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getRecipeTags() {
  return http.get(apiEndpoint);
}

export function getRecipeTag(id) {
  return http.get(recipeTagsUrl(id));
}

export function saveRecipeTag(recipeTag) {
  const body = { ...recipeTag };
  delete body._id;

  if (recipeTag._id) {
    http.put(recipeTagsUrl(recipeTag._id), body);
  } else {
    http.post(apiEndpoint, body);
  }
}

export function deleteRecipeTag(id) {
  return http.delete(recipeTagsUrl(id));
}
