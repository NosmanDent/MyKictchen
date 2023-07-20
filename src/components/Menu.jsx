import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ items }) => {
  return (
    <div className="md:w-[90vw] md:max-w-[1170px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 md:gap-12 gap-6 md:mx-0 mx-4  mb-20 md:mt-0 mt-10">
      {items.map((menuItem, index) => {
        const { id, title, img, price } = menuItem;
        return (
          <Link to={`/shop/${id}`} key={index}>
            <article
              key={index}
              className="bg-black flex flex-col cursor-pointer border-t border-black  rounded-t-full p-3 shadow-lg shadow-black"
            >
              <div className="relative">
                <img
                  src={img}
                  alt={title}
                  className="object-cover h-[200px] w-[100%] block rounded-t-full"
                />

                <div className="absolute inset-0 bg-black/90 rounded-t-full flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-bold text-center  bg-white/10 rounded-full px-4 py-2">
                    More about {title}
                  </span>
                </div>
              </div>
              <div className="text-black">
                <header className="flex flex-row items-center justify-between mt-1">
                  <h4 className="nav-logo md:text-sm text-sm whitespace-nowrap text-white">
                    {title}
                  </h4>
                  <h4 className="nav-logo md:text-sm text-sm text-stone-200">
                    <span className="line-through">N</span>
                    {price}
                  </h4>
                </header>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
