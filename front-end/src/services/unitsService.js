import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/units";

export function getUnits() {
  return http.get(apiEndpoint);
}
