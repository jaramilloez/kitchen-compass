import React, { Component } from "react";
import { logOut } from "../services/authService";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div>
        <button
          onClick={() => {
            logOut();
            window.location = "/";
          }}
        >
          logOut
        </button>
      </div>
    );
  }
}

export default Profile;
