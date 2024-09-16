import React from "react";

const Select = ({ name, label, error, options, value, ...rest }) => {
  return (
    <div className="form-group my-3">
      {error && <div className="alert alert-danger my-1 p-2">{error}</div>}
      <div className="form-floating">
        <select
          className="form-select"
          id={name}
          value={value}
          name={name}
          {...rest}
        >
          <option disabled={value._id}></option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
};

export default Select;
