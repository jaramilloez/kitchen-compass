import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/groups";

function groupUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getGroup(id) {
  return http.get(groupUrl(id));
}

export function saveGroup(group) {
  if (group._id) {
    http.put(groupUrl(group._id));
  } else {
    http.post(apiEndpoint);
  }
}

export function deleteGroup(groupId) {
  return http.delete(groupUrl(groupId));
}
