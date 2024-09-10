import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/cuisines";

export function getCuisines() {
  return http.get(apiEndpoint);
}
