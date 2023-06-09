import { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "../components/CartProduct";
import { supabase } from "../supabaseClient";
import { GiShoppingCart } from "react-icons/gi";
import { TbCurrencyNaira } from "react-icons/tb";

import { Link } from "react-router-dom";

const CartPage = () => {
  const cart = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);

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

  const twoPercentOfTotalCost = totalCost * 0.02;
  const totalCostWithShipping = totalCost + twoPercentOfTotalCost;

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <div className="flex flex-col ">
      <div className="flex flex-1  w-full h-[300px]">
        <h1 className=" nav-logo lg:text-6xl text-4xl font-serif font-bold  flex  justify-center mx-auto mt-20">
          CART
        </h1>
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
        <section className=" flex-col w-full mb-16 ">
          <p className="md:text-4xl text-center font-serif mb-6 text-2xl font-semibold">
            Items in your cart
          </p>
          {cart.items.map((currentProduct, idx) => (
            <CartProduct
              key={idx}
              id={currentProduct.id}
              quantity={currentProduct.quantity}
              className=""
            ></CartProduct>
          ))}

          <div className="space-y-1 text-right bg-[#111827] md:pr-6 pr-4 py-1 md:mx-10">
            <p className="text-sm text-gray-400 flex items-start justify-end">
              Food Cost: <TbCurrencyNaira className="text-lg" /> {totalCost}{" "}
            </p>
            <p className="text-sm text-gray-400 flex flex-row items-start justify-end">
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
          <div className="flex justify-end space-x-4 bg-[#111827] md:pr-6 pr-4 py-6 md:mx-10">
            <Link to="/">
              <button
                type="button"
                className="px-6 py-2 border rounded-md text-white border-violet-400"
              >
                Back
                <span className="sr-only sm:not-sr-only"> to shop</span>
              </button>
            </Link>
            <Link to="/payment">
              <button
                type="button"
                className="px-6 py-2 border rounded-md bg-violet-400 text-gray-900 border-violet-400"
              >
                <span className="sr-only sm:not-sr-only">Continue to </span>
                Checkout
              </button>
            </Link>
          </div>
        </section>
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center gap-4">
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
