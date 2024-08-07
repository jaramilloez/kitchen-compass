import React, { Component } from "react";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { data, errors } = this.state;
    const { error } = this.schema.validate({ data });
    console.log(this.schema.validate({ data }));
    if (error) console.log(error);
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = ({ currentTarget: input }) => {
    const { data } = this.state;

    data[input.name] = input.value;
    this.setState({ data });

    this.validate();
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        value={data[name]}
        type={type}
        onChange={this.handleChange}
      />
    );
  };

  renderSubmit = (name) => {
    return (
      <button className="btn btn-dark my-4" onClick={this.handleSubmit}>
        {name}
      </button>
    );
  };

  renderTitle = (name) => {
    return <div className="fs-1">{name}</div>;
  };
}

export default Form;
