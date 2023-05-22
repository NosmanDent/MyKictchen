import React, { useEffect, useRef } from "react";

const Categories = ({ categories, filterItems }) => {
  return (
    <div className=" w-full flex flex-1 flex-wrap  items-center  justify-center  lg:gap-4 md:gap-3 gap-4 my-10">
      {categories.map((category, index) => (
        <div
          className="flex-shrink-0 flex flex-wrap gap-2 items-center justify-center mx-2 md:mx-0"
          key={index}
        >
          <button
            type="button"
            className=" text-white bg-black whitespace-nowrap md:px-4 px-3 py-2 nav-logo rounded-full lg:text-sm text-xs"
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
