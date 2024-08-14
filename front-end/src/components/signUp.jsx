import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./common/form";

class SignUp extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password").min(8),
  };

  doSubmit = () => {
    console.log("User added to DB and given a JWT.");
    this.props.history.push("/");
  };

  render() {
    return (
      <div
        id="formWrapper"
        className="container bg-white py-4 px-5 mb-5 rounded-1 shadow text-center"
      >
        {this.renderTitle("Sign Up")}
        <form>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSubmit("Submit")}
        </form>
        <div className="fs-5 my-4">
          Already have an account?{" "}
          <Link
            to="/log-in"
            className="linkLine text-dark fw-bold text-decoration-none"
          >
            Log in here.
          </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
