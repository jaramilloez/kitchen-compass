import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { jwtLogIn } from "../services/authService";
import { signUp } from "../services/usersService";
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

  doSubmit = async () => {
    try {
      const response = await signUp(this.state.data);
      console.log(response);
      jwtLogIn(response.headers["auth"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        console.log(errors);
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div
        id="formWrapper"
        className="container bg-white py-4 px-5 mb-4 rounded-1 shadow text-center"
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
