import React from "react";

const RecipeFilters = ({ filters, selectedFilter, onFilterSelect }) => {
  const isActive = (filter, index) => {
    if (selectedFilter == null) {
      if (index === 0) return true;
      else return false;
    } else {
      if (filter === selectedFilter) return true;
      else return false;
    }
  };

  return (
    <ul className="bgLightGray col-auto list-group p-0 rounded-start-1">
      <li className="list-group-item border-0 bg-transparent fs-5 pe-5">
        Cuisines
      </li>
      {filters.map((filter, index) => (
        <li
          className={
            isActive(filter, index)
              ? "bg-white border-0 list-group-item pe-5 fs-6"
              : "pointerHover filterItem border-0 list-group-item pe-5 fs-6"
          }
          key={filter._id}
          onClick={() => onFilterSelect(filter)}
        >
          {filter.name}
        </li>
      ))}
    </ul>
  );
};

export default RecipeFilters;
