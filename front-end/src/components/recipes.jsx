import React from "react";
import { Link } from "react-router-dom";

const Recipes = () => {
  return (
    <div className="container bg-white p-4 rounded-1 shadow">
      <div className="row flex-wrap">
        <Link
          to="/recipe"
          className="col-md-4 col-6 d-flex justify-content-center text-decoration-none p-2"
        >
          <div className="recipeCard card border-0">
            <div className="position-relative">
              <img
                className="card-img-top"
                src={require("../images/spaghetti.jpg")}
                alt="Spaghetti"
              />
              <div className="cardDrawer bg-light position-absolute fs-5 opacity-75 w-100 p-3 overflow-hidden z-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className="card-body bg-light rounded-bottom-2 py-2 z-1">
              <div className="card-title fs-4">Spaghetti</div>
            </div>
          </div>
        </Link>
        <Link
          to="/recipe"
          className="col-md-4 col-6 d-flex justify-content-center text-decoration-none p-2"
        >
          <div className="recipeCard card border-0">
            <div className="position-relative">
              <img
                className="card-img-top"
                src={require("../images/spaghetti.jpg")}
                alt="Spaghetti"
              />
              <div className="cardDrawer bg-light position-absolute fs-5 opacity-75 w-100 p-3 overflow-hidden z-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className="card-body bg-light rounded-bottom-2 py-2 z-1">
              <div className="card-title fs-4">Spaghetti</div>
            </div>
          </div>
        </Link>
        <Link
          to="/recipe"
          className="col-md-4 col-6 d-flex justify-content-center text-decoration-none p-2"
        >
          <div className="recipeCard card border-0">
            <div className="position-relative">
              <img
                className="card-img-top"
                src={require("../images/spaghetti.jpg")}
                alt="Spaghetti"
              />
              <div className="cardDrawer bg-light position-absolute fs-5 opacity-75 w-100 p-3 overflow-hidden z-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className="card-body bg-light rounded-bottom-2 py-2 z-1">
              <div className="card-title fs-4">Spaghetti</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Recipes;
