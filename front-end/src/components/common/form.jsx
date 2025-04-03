import React, { Component } from "react";
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
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });
    console.log(error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    //Gets the current data, updates the object, then updates state
    const data = { ...this.state.data };
    if (Array.isArray(data[input.name])) {
      data[input.name][input.id].name = input.value;
    } else {
      data[input.name] = input.value;
    }
    this.setState({ data });
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
        index={index}
        min={1}
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
      <button
        className="bgBlue shadowHover btn w-100 h-100"
        onClick={this.handleSubmit}
      >
        {name}
      </button>
    );
  };

  renderTitle = (name) => {
    return <div className="fs-1">{name}</div>;
  };
}

export default Form;
