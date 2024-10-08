import config from "../config.json";
import http from "./httpService";
import { jwtDecode } from "jwt-decode";

const apiEndpoint = config.apiUrl + "/users/auth";
const tokenKey = "token";

export async function logIn(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function logOut() {
  localStorage.removeItem(tokenKey);
}

//Decodes existing jwt from user and returns it
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {}
}

//Immedietly after a user signs up
export function jwtLogIn(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
