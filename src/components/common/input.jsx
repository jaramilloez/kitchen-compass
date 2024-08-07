import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-floating">
      {error && <div className="alert alert-warning">{error}</div>}
      <input
        name={name}
        id={name}
        className="form-control my-5"
        placeholder={label}
        {...rest}
      />
      <label htmlFor={name} placeholder={label}>
        {label}
      </label>
    </div>
  );
};

export default Input;
