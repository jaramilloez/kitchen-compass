import React from "react";
import { getUser } from "../services/usersService";
import { getGroup } from "../services/groupsService";
import { getGroupUser, getGroupUsers } from "../services/groupUsersService";
import Form from "./common/form";

class Group extends Form {
  state = {
    group: {},
    usersInGroup: [],
  };

  async componentDidMount() {
    const { user } = this.props;
    try {
      const { data: groupUser } = await getGroupUser(user._id);
      if (groupUser) {
        //Get the group
        const { data: group } = await getGroup(groupUser.groupId);

        //Get users in the group
        let users = [];
        const { data: groupUsers } = await getGroupUsers(group._id);
        for (const element of groupUsers) {
          const { data: otherUser } = await getUser(element.userId);
          users += otherUser;
        }

        this.setState({ group, usersInGroup: users });
      }
    } catch (ex) {}
  }
  render() {
    return (
      <div className="container shadow rounded-1 bg-white my-4 p-4">
        <div className="container col">{this.renderTitle("Group")}</div>
        <div className="container col"></div>
      </div>
    );
  }
}

export default Group;
