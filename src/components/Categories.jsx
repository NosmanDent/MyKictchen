import React, { useState } from "react";

const Categories = ({ categories, filterItems }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    filterItems(category);
  };

  return (
    <div className="w-full flex flex-1 flex-wrap items-center justify-center lg:gap-4 md:gap-3 gap-1 my-10">
      {categories.map((category, index) => (
        <div
          className="flex-shrink-0 flex flex-wrap gap-2 items-center justify-center mx-2 md:mx-0"
          key={index}
        >
          <button
            type="button"
            className={`text-white ${
              activeCategory === category
                ? "bg-pink-500 text-black border border-black"
                : "bg-black"
            } whitespace-nowrap md:px-4 px-3 py-2 nav-logo rounded-full lg:text-sm text-xs`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
