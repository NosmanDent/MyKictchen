import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import { supabase } from "../supabaseClient";
import { TbCurrencyNaira } from "react-icons/tb";
import SkeletonLoader from "./SkeletonLoader";

function PaymentProduct(props) {
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
    <section className="flex flex-col  p-6 space-y-4  bg-pink-300 text-gray-900 md:mx-10 border border-white">
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
                  <p className="text-xs md:text-sm text-gray-900">
                    Category: {productData.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm md:text-lg font-semibold">
                    {quantity} total
                  </p>
                  <p className="text-xs md:text-sm  text-gray-900 flex items-start">
                    <TbCurrencyNaira className="text-lg" />
                    {(quantity * productData.price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default PaymentProduct;
