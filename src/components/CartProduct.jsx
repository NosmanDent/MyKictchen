import { CartContext } from "../CartContext";
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { AiFillDelete } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import SkeletonLoader from "./SkeletonLoader";

function CartProduct(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    async function fetchProductData() {
      const { data, error } = await supabase
        .from("kitchen")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product data:", error);
      } else {
        setProductData(data);
      }
    }

    fetchProductData();
  }, [id]);

  if (!productData) {
    return (
      <div className="flex flex-1 items-center justify-center mx-10">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <section className="flex flex-col  p-6 space-y-4  bg-gray-900 text-gray-100 md:mx-10 border border-white">
      <ul className="flex flex-col ">
        <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col md:flex-row w-full  sm:space-x-4">
            <img
              className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500"
              src={productData.img}
              alt={productData.title}
            />
            <div className="flex flex-col justify-between w-full pb-4">
              <div className="flex justify-between w-full pb-2 space-x-2">
                <div className="space-y-1">
                  <h3 className="md:text-lg text-sm  font-semibold leading-snug sm:pr-8">
                    {productData.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400">
                    Category: {productData.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-lg font-semibold">
                    {quantity} total
                  </p>
                  <p className="text-xs md:text-sm  text-gray-200 flex items-start">
                    <TbCurrencyNaira className="text-lg" />
                    {(quantity * productData.price).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="md:bg-black/50 rounded-full py-2 px-6 md:w-48 flex -ml-6 md:-ml-0">
                <button
                  className="md:bg-black rounded-full text-white md:text-3xl text-lg py-1 px-3 shadow-lg shadow-white "
                  onClick={() => cart.addOneToCart(id)}
                >
                  +
                </button>
                <button
                  className=" rounded-full text-white md:text-2xl text-xl py-[10px] px-3 "
                  onClick={() => cart.deleteFromCart(id)}
                >
                  <AiFillDelete />
                </button>
                <button
                  className="md:bg-black rounded-full text-white md:text-3xl text-lg py-1 px-3 shadow-lg shadow-white "
                  onClick={() => cart.removeOneFromCart(id)}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default CartProduct;
