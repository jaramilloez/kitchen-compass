import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/categories";

export function getCategories() {
  return http.get(apiEndpoint);
}
