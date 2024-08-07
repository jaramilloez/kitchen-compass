import React from "react";
import Joi from "joi";
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

  schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string()
      .required()
      .label("Username")
      .email({ tlds: { allow: ["com", "net", "edu"] } }),
    password: Joi.string().required().label("Password").min(8),
  });

  render() {
    return (
      <div
        id="formWrapper"
        className="container bg-white p-4 rounded-1 shadow text-center p-5"
      >
        {this.renderTitle("Sign Up")}
        <form>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSubmit("Submit")}
          <div className="fs-5">
            Already have an account?{" "}
            <Link
              to="/log-in"
              className="linkLine text-dark fw-bold text-decoration-none"
            >
              Log in here.
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
