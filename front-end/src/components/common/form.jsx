import React, { Component } from "react";
import Joi from "joi-browser";
import Textarea from "./textarea";
import Select from "./select";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      console.log(errors);
      return;
    }
    this.doSubmit();
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    //Error handling
    const errors = { ...this.state.errors };
    const errorMessage = this.validateInput(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else delete errors[input.name];

    //Sets state
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateInput = ({ name, value }) => {
    const inputObj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(inputObj, schema);
    return error ? error.details[0].message : null;
  };

  renderInput = (name, label, type = "text", index) => {
    const { data, errors } = this.state;

    const findValue = () => {
      if (Array.isArray(data[name])) {
        const value = data[name];
        return value[index].name;
      } else return data[name];
    };

    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        value={findValue()}
        type={type}
        onChange={this.handleChange}
      />
    );
  };

  renderTextarea = (name, label) => {
    const { data, errors } = this.state;

    return (
      <Textarea
        name={name}
        label={label}
        error={errors[name]}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        error={errors[name]}
        options={options}
        value={data[name]}
        onChange={(event) => this.handleChange(event, options)}
      />
    );
  }

  renderSubmit = (name) => {
    return (
      <button className="btn btn-dark" onClick={this.handleSubmit}>
        {name}
      </button>
    );
  };

  renderTitle = (name) => {
    return <div className="fs-1">{name}</div>;
  };
}

export default Form;
