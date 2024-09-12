import React from "react";

const NotFound = () => {
  return (
    <div className="text-center">
      <div className="fs-1 bold">Not Found :(</div>
      <img
        src={require("../images/crumbs.png")}
        alt="A plate with only crumbs."
        style={{ height: "50vh" }}
      />
    </div>
  );
};

export default NotFound;
