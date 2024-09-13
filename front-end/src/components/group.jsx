import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getUser } from "../services/usersService";
import {
  getGroup,
  getAndJoinGroup,
  saveGroup,
} from "../services/groupsService";
import {
  getGroupUser,
  getGroupUsers,
  postUserToGroup,
} from "../services/groupUsersService";

class Group extends Form {
  state = {
    group: "",
    usersInGroup: [],
    data: {},
    errors: {},
  };

  schema = {
    code: Joi.string().required().length(6),
  };

  async componentDidMount() {
    try {
      const { data: groupUser } = await getGroupUser(this.props.user._id);
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

  startGroup = async () => {
    saveGroup();
    postUserToGroup({
      groupId: this.state.group._id,
      userId: this.props.user._id,
    });
  };

  render() {
    const { group } = this.state;
    return (
      <div className="container shadow rounded-1 bg-white my-4 p-5">
        {this.renderTitle("Group")}
        {!group && (
          <React.Fragment>
            <div className="fs-4 fst-italic">You are not in a group.</div>
            <button
              className="btn btn-dark mt-2"
              onClick={() => this.startGroup()}
            >
              Start a group
            </button>
            <div className="mt-3">
              <div className="fs-5">Join a group</div>
              {this.renderInput("code", "Code")}
              {this.renderSubmit("Join")}
            </div>
          </React.Fragment>
        )}
        {group && <React.Fragment></React.Fragment>}
      </div>
    );
  }
}

export default Group;
