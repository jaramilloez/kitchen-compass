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
    <ul className="col-auto list-group p-0">
      <li className="list-group-item border-0 fs-5">Filters</li>
      {filters.map((filter, index) => (
        <li
          className={
            isActive(filter, index)
              ? "list-group-item border-0 pe-3 fs-6 bgBlue"
              : "pointerHover filterItem list-group-item border-0 pe-3 p fs-6 bg-transparent"
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
