import React from "react";
import { Link } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { MdCategory } from "react-icons/md";

const Menu = ({ items }) => {
  return (
    <div className="md:w-[90vw] md:max-w-[1170px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 md:gap-12 gap-6 md:mx-0 mx-4  mb-20 md:mt-0 mt-10">
      {items.map((menuItem, index) => {
        const { id, title, img, price, category } = menuItem;
        return (
          <div key={index}>
            <div
              key={index}
              className="bg-white flex flex-col cursor-pointer rounded-lg p-3 "
            >
              <Link to={`/shop/${id}`} className="relative">
                <img
                  src={img}
                  alt={title}
                  className="object-cover h-[200px] w-[100%] block rounded-lg"
                />
              </Link>
              <div className="text-black">
                <header className="flex md:flex-row flex-col items-center justify-between mt-1">
                  <h4 className=" md:text-sm text-sm whitespace-nowrap font-bold text-black">
                    {title}
                  </h4>
                  <h4 className=" md:text-xs text-sm whitespace-nowrap font-bold text-stone-400 md:text-black">
                    {category}
                  </h4>
                </header>
              </div>
              <div className="text-black">
                <div className="flex flex-row items-center justify-between mt-1">
                  <h4 className=" md:text-sm text-sm text-black">
                    <span className="line-through">N</span>
                    {price}
                  </h4>
                  <Link
                    to={`/shop/${id}`}
                    className=" text-white bg-pink-600 rounded-full"
                  >
                    <div>
                      <GrAdd className="text-3xl  p-1" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
