import React from "react";
import { Link } from "react-router-dom";

const RecipeCards = ({ data }) => {
  return (
    <div className="container p-4 m-0 col rounded-end-1 bg-white">
      <div className="row flex-wrap">
        {data.map((item) => (
          <Link
            to={`/recipes/${item._id}`}
            className="col-md-4 col-6 d-flex justify-content-center text-decoration-none p-2"
          >
            <div className="recipeCard card border-0">
              <div className="position-relative">
                <img
                  className="card-img-top"
                  src={item.pic}
                  alt={item.description}
                />
                <div className="cardDrawer bgLightGray position-absolute fs-5 opacity-75 w-100 p-3 overflow-hidden z-0">
                  {item.description}
                </div>
              </div>
              <div className="card-body bgLightGray rounded-bottom-2 py-2 z-1">
                <div className="card-title fs-4">{item.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeCards;
