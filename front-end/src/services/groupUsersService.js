import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/";

function groupUserUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getGroupUsers(userId) {
  return http.get(`${apiEndpoint}/${userId}`);
}

export function postUserToGroup(groupUser) {
  delete groupUser._id;
  http.post(apiEndpoint, groupUser);
}

export function deleteUserFromGroup(userId) {
  return http.delete(groupUserUrl(userId));
}
