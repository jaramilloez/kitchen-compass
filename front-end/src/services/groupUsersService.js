import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/groupUsers";

function groupUserUrl(path, id) {
  return `${apiEndpoint}/${path}/${id}`;
}

export function getGroupUser(userId) {
  return http.get(groupUserUrl("user", userId));
}

export function getGroupUsers(groupId) {
  return http.get(groupUserUrl("users", groupId));
}

export function postUserToGroup(groupUser) {
  http.post(apiEndpoint, groupUser);
}

export function deleteUserFromGroup(id) {
  return http.delete(groupUserUrl(id));
}
