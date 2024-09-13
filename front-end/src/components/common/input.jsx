import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group my-3">
      {error && <div className="alert alert-danger my-1 p-2">{error}</div>}
      <div className="form-floating">
        <input
          name={name}
          id={name}
          className="form-control"
          placeholder={label}
          {...rest}
        />
        <label htmlFor={name} placeholder={label}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
