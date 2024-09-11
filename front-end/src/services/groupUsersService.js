import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/groupUsers";

function groupUserUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getGroupUser(userId) {
  return http.get(`${apiEndpoint}/${userId}`);
}

export function postUserToGroup(groupUser) {
  http.post(apiEndpoint, groupUser);
}

export function deleteUserFromGroup(id) {
  return http.delete(groupUserUrl(id));
}
