import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const RecipeFilters = ({ filters, selectedFilter, onFilterSelect }) => {
  const isActive = (filter, index) => {
    if (selectedFilter == null) {
      return index === 0 ? true : false;
    } else {
      return filter === selectedFilter ? true : false;
    }
  };

  return (
    <ul className="col-auto list-group p-0">
      <li className="list-group-item border-0 fs-5">
        Filters <FontAwesomeIcon icon={faFilter} size="2xs" />
      </li>
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
