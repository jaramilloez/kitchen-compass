import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/directions";

function directionUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getDirections(recipeId) {
  return http.get(`${apiEndpoint}/${recipeId}`);
}

export function saveDirection(direction) {
  const body = { ...direction };
  delete body._id;

  if (direction._id) {
    http.put(directionUrl(direction._id), body);
  } else {
    http.post(apiEndpoint, body);
  }
}

export function deleteDirection(directionId) {
  return http.delete(directionUrl(directionId));
}
