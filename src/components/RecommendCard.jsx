import React from "react";
import { Link } from "react-router-dom";

const RecommendCard = ({ kitchen, id }) => {
  const scrollTop = () => {
    // Scroll to top of window
    window.scrollTo(0, 0);
  };
  return (
    <Link to={`/shop/${id}`} key={id} onClick={scrollTop}>
      <article
        key={id}
        className="flex flex-col mx-6 cursor-pointer border border-black bg-stone-100 rounded-lg p-3 shadow-lg shadow-black "
      >
        <div className="relative">
          <img
            src={kitchen.img}
            alt={kitchen.title}
            className="object-cover h-[200px] w-[100%] block rounded-lg"
          />

          <div className="absolute inset-0 bg-black/90 rounded-lg flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white text-lg font-bold text-center">
              Read More about {kitchen.title}
            </span>
          </div>
        </div>
        <div className="text-black">
          <header className="flex flex-row items-center justify-between mt-1">
            <h4 className="nav-logo md:text-sm text-sm whitespace-nowrap">
              {kitchen.title}
            </h4>
            <h4 className="nav-logo md:text-sm text-sm">
              <span className="line-through">N</span>
              {kitchen.price}
            </h4>
          </header>
        </div>
      </article>
    </Link>
  );
};

export default RecommendCard;
