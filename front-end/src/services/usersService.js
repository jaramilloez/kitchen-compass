import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/users";

export function getUser(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export function signUp(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}
