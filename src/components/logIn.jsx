import React from "react";
import Joi from "joi";
import { Link } from "react-router-dom";
import Form from "./common/form";

class LogIn extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    email: Joi.string()
      .required()
      .label("Username")
      .email({ tlds: { allow: ["com", "net", "edu"] } }),
    password: Joi.string().required().label("Password").min(8),
  });

  onSubmit = () => {
    console.log("User verified");
    this.props.history.push("/");
  };
  render() {
    return (
      <div
        id="formWrapper"
        className="container bg-white p-5 rounded-1 shadow text-center"
      >
        {this.renderTitle("Log In")}
        <form>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSubmit("Submit")}
          <div className="fs-5">
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
