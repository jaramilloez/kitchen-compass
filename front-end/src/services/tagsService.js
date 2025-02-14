import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/tags";

export function getTags() {
  return http.get(apiEndpoint);
}
