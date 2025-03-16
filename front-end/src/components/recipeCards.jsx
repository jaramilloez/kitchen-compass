import React from "react";
import { Link } from "react-router-dom";

const RecipeCards = ({ data }) => {
  return (
    <div className="container col py-3">
      <div className="row flex-wrap">
        {data.map((item) => (
          <Link
            to={`/recipes/${item._id}`}
            className="col-md-4 col-6 d-flex justify-content-center text-decoration-none p-2"
            key={item._id}
          >
            <div className="recipeCard shadowHover card border-0">
              <div className="position-relative">
                <img
                  className="card-img-top"
                  src={`data:image/jpg;base64,${item.pic}`}
                  alt={item.description}
                />
                <div className="cardDrawer position-absolute fs-5 w-100 p-3 overflow-hidden z-0 rounded-top-2">
                  {item.description}
                </div>
              </div>
              <div className="card-body bgBlue rounded-bottom-2 py-1 z-1">
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
