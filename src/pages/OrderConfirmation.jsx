import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-center gap-3 bg-pink-300">
      <h4 className="font-medium md:text-4xl text-2xl flex items-center">
        Hey&nbsp;<span className="text-blue-700 font-bold">{name}</span>,
      </h4>
      <h1>Thank You!</h1>

      <div>We will confirm your Payment and place your Order immediately.</div>
      <Link to="/">
        <button className="border border-black rounded-lg py-3 px-6">
          BACK TO HOME
        </button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
