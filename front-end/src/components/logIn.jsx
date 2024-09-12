import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { logIn } from "../services/authService";
import Form from "./common/form";

class LogIn extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password").min(8),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;

      await logIn(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div
        id="formWrapper"
        className="container bg-white py-4 px-5 mb-5 rounded-1 shadow text-center"
      >
        {this.renderTitle("Log In")}
        <form>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSubmit("Submit")}
          <div className="fs-5 my-4">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="linkLine text-dark fw-bold text-decoration-none"
            >
              Sign up here.
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
