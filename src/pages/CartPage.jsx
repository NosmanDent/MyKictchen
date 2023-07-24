import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "../components/CartProduct";
import { supabase } from "../supabaseClient";
import { GiShoppingCart } from "react-icons/gi";
import { TbCurrencyNaira } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotalCost();
  }, [cart.items]);

  const calculateTotalCost = async () => {
    if (cart.items.length === 0) {
      setTotalCost(0);
      return;
    }

    const productIds = cart.items.map((product) => product.id);
    const { data: products, error } = await supabase
      .from("kitchen")
      .select("*")
      .in("id", productIds);

    if (error) {
      console.error("Error fetching product details:", error);
      return;
    }

    const total = products.reduce((sum, product) => {
      const cartProduct = cart.items.find((item) => item.id === product.id);
      return sum + product.price * cartProduct.quantity;
    }, 0);

    setTotalCost(total);
  };

  const handleCheckout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // After the delay, navigate to the payment page
      navigate("/payment");
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  const twoPercentOfTotalCost = totalCost * 0.02;
  const totalCostWithShipping = totalCost + twoPercentOfTotalCost;

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  return (
    <div className="flex flex-col bg-pink-300">
      <div className="flex flex-1  w-full h-[300px]">
        <div className="flex absolute items-center ml-4 mt-4 gap-2">
          <h1 className="text-sm font-semibold  cursor-pointer">
            <Link to="/">
              <span className="bg-black text-xs py-2 px-3 text-white rounded-full">
                Home
              </span>
            </Link>{" "}
            -{" "}
            <Link to="/shop">
              <span className="bg-black text-xs py-2 px-3 text-white rounded-full">
                Shop
              </span>
            </Link>{" "}
            -{" "}
            <span className="bg-black/70 text-xs py-2 px-3 text-white rounded-full">
              Cart
            </span>
          </h1>
        </div>
      </div>

      {productsCount > 0 ? (
        <section className=" flex-col w-full h-full py-20 items-center justify-center">
          <p className="md:text-4xl text-center font-serif mb-6 text-2xl font-semibold">
            You Cart
          </p>
          {cart.items.map((currentProduct, idx) => (
            <CartProduct
              key={idx}
              id={currentProduct.id}
              quantity={currentProduct.quantity}
              className=""
            ></CartProduct>
          ))}

          <div className="space-y-1 text-right bg-black md:pr-6 pr-4 py-1 md:mx-10">
            <p className="text-sm text-white flex items-start justify-end">
              Food Cost: <TbCurrencyNaira className="text-lg" /> {totalCost}{" "}
            </p>
            <p className="text-sm text-white flex flex-row items-start justify-end">
              Shipping costs{" "}
              <span>
                <TbCurrencyNaira className="text-lg" />
              </span>{" "}
              {twoPercentOfTotalCost}
            </p>
            <p className="text-white flex items-center justify-end">
              Total: <TbCurrencyNaira className="text-lg" />{" "}
              {totalCostWithShipping}
            </p>
          </div>
          <div className="flex justify-end space-x-4 bg-black md:pr-6 pr-4 py-6 md:mx-10">
            <Link to="/">
              <button
                type="button"
                className="px-6 py-2 border rounded-md text-white border-pink-300"
              >
                Back
                <span className="sr-only sm:not-sr-only"> to shop</span>
              </button>
            </Link>
            <div>
              <button
                type="button"
                className="px-6 py-2 border rounded-md bg-pink-300 text-gray-900 border-pink-200"
                onClick={handleCheckout} // Add the click event handler
                disabled={loading} // Disable the button when loading is true
              >
                {loading ? (
                  // Display the loading spinner when loading is true
                  <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
                ) : (
                  // Display the button text when loading is false
                  <>
                    <span className="sr-only sm:not-sr-only">Continue to </span>
                    Checkout
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col w-full items-center justify-center h-screen gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Your Cart Is Empty
          </h1>
          <div>
            <GiShoppingCart className="text-8xl md:text-9xl text-gray-600 " />
          </div>
          <h1 className="text-lg md:text-2xl font-semibold  text-center px-2">
            Go Back to Kitchen and Order for your food
          </h1>
          <Link to="/shop">
            <button className="border border-black mb-16 py-3 px-6 rounded-lg">
              GO TO KITCHEN
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
