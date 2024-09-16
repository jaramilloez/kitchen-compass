import React from "react";

const Textarea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group my-3">
      {error && <div className="alert alert-danger my-1 p-2">{error}</div>}
      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder={label}
          id={name}
          name={name}
          style={{ height: "100px" }}
          {...rest}
        ></textarea>
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
};

export default Textarea;
