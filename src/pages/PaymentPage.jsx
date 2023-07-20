import React, { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../CartContext";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import InputWrapper from "../components/InputWrapper";
import { TbCurrencyNaira } from "react-icons/tb";
import PaymentProduct from "../components/PaymentProduct";
import { AiOutlineCheck } from "react-icons/ai";

const PaymentPage = () => {
  const cart = useContext(CartContext);

  const [totalCost, setTotalCost] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      formData.email === "" ||
      formData.name === "" ||
      formData.method === "" ||
      formData.city === "" ||
      formData.number === ""
    ) {
      alert("Please fill the form.");
      return;
    }

    // Set isLoading to true when the button is clicked
    setIsLoading(true);

    // Perform your getform function here
    // ...

    // Clear the cart
    cart.clearCart();

    // Navigate to the success page after a short delay (optional)
    setTimeout(() => {
      navigate(`/success?name=${encodeURIComponent(formData.name)}`);
      setIsLoading(false); // Reset isLoading to false
    }, 1500); // Delay of 1.5 seconds
  };

  const toggleModal = () => {
    if (
      formData.email !== "" &&
      formData.name !== "" &&
      formData.method !== "" &&
      formData.city !== "" &&
      formData.number !== ""
    ) {
      setShowModal(true);
    } else {
      alert("Please fill the form.");
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    checkbox: false,
    name: "",
    method: "",
    city: "",
    number: "",
  });

  function handleChange(e) {
    setFormData((prevItem) => {
      return { ...prevItem, [e.target.id]: e.target.value };
    });
  }

  function handleSwitch(e) {
    setFormData((prevItem) => {
      return { ...prevItem, [e.target.id]: !formData.checkbox };
    });
  }

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
    <>
      <div className="flex flex-1  w-full mb-10">
        <h1 className=" nav-logo lg:text-6xl text-4xl font-serif font-bold  flex  justify-center mx-auto mt-20">
          Payment
        </h1>
        <div className="flex absolute items-center ml-4 mt-4 gap-2">
          <h1 className="text-sm font-semibold  cursor-pointer">
            <Link to="/">
              <span className="md:bg-black md:text-xs md:py-2 md:px-3 md:text-white rounded-full">
                Home
              </span>
            </Link>{" "}
            -{" "}
            <Link to="/shop">
              <span className="md:bg-black md:text-xs md:py-2 md:px-3 md:text-white rounded-full">
                Shop
              </span>
            </Link>{" "}
            -{" "}
            <Link to="/cart">
              <span className="md:bg-black md:text-xs md:py-2 md:px-3 md:text-white rounded-full">
                Cart
              </span>
            </Link>
            -{" "}
            <span className="md:bg-black/70 md:text-xs md:py-2 md:px-3 md:text-white text-stone-400 rounded-full">
              Payment
            </span>
          </h1>
        </div>
      </div>
      <section className=" flex md:flex-row flex-col w-full  gap- bg-[#111827] p-10">
        <div className="flex flex-col md:w-1/2 w-full">
          {productsCount > 0 ? (
            <section className=" flex-col w-full mb-16 ">
              {cart.items.map((currentProduct, idx) => (
                <PaymentProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                  className=""
                ></PaymentProduct>
              ))}

              <div className="space-y-1 text-right bg-[#111827]  py-1 md:mx-10">
                <p className="text-sm text-gray-400 flex flex-row items-center justify-end">
                  Food Cost:{" "}
                  <span>
                    <TbCurrencyNaira className="text-lg" />
                  </span>{" "}
                  {totalCost}{" "}
                </p>
                <p className="text-sm text-gray-400 flex flex-row items-center justify-end">
                  Shipping costs{" "}
                  <span>
                    <TbCurrencyNaira className="text-lg" />
                  </span>{" "}
                  {twoPercentOfTotalCost}
                </p>
                <div className="text-white flex flex-row items-center justify-end">
                  Total:{" "}
                  <span>
                    <TbCurrencyNaira className="text-lg" />
                  </span>{" "}
                  {totalCostWithShipping}
                </div>
              </div>
            </section>
          ) : (
            <div className=" items-center justify-center gap-4 hidden">
              <h1>Oops! Something is wrong! Go back to Kitchen</h1>
              <Link to="/shop">
                <button className="border border-black mb-16 py-3 px-6 rounded-lg">
                  GO TO KITCHEN
                </button>
              </Link>
            </div>
          )}
        </div>
        <main className="flex md:w-1/2 w-full md:mr-6 bg-[#111827]">
          <form
            className="w-full"
            action="https://getform.io/f/58aec1d4-8dbb-4a27-bf7f-b07d732037a0"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <InputWrapper>
              <label htmlFor="email" className="text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="text-gray-500 focus:outline-0 bg-[#F2F2F2]  border-[0.5px] border-[#747474] rounded-[10px] py-3 px-5 mt-2 w-full"
                required
              />
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="bg-transparent "
                value={formData.checkbox}
                onChange={handleSwitch}
              />
              <label
                htmlFor="checkbox"
                className="text-sm ml-3 mt-3 inline-block text-white"
              >
                Get updates about new drops & exclusive offers
              </label>
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="name" className="text-white">
                Your full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="text-gray-500 focus:outline-0 bg-[#F2F2F2]  border-[0.5px] border-[#747474] rounded-[10px] py-3 px-5 mt-2 w-full"
                required
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="method" className="text-white">
                Payment Method
              </label>
              <select
                placeholder="select"
                name="method"
                id="method"
                required
                onChange={handleChange}
                value={formData.method}
                className="text-gray-500 focus:outline-0 bg-[#F2F2F2]   border-[0.5px] border-[#747474] rounded-[10px] py-5 px-5 mt-2 w-full"
              >
                <option value=""></option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="city" className="text-white">
                Address
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="text-gray-500 focus:outline-0 bg-[#F2F2F2]  border-[0.5px] border-[#747474] rounded-[10px] py-3 px-5 mt-2 w-full"
                required
              />
            </InputWrapper>

            <InputWrapper>
              <label htmlFor="number" className="text-white">
                Phone Number
              </label>
              <input
                type="number"
                name="number"
                id="number"
                value={formData.number}
                onChange={handleChange}
                className="text-gray-500 focus:outline-0 bg-[#F2F2F2]  border-[0.5px] border-[#747474] rounded-[10px] py-3 px-5 mt-2 w-full"
                required
                placeholder="080..........."
              />
            </InputWrapper>
            <input type="hidden" name="amount" value={totalCostWithShipping} />
            <div className="flex flex-row gap-2 ">
              <div
                onClick={toggleModal}
                className="cursor-pointer border boder-white  block w-full text-center md:text-xl text-sm text-white mt-8 py-3 "
              >
                Account Details
              </div>
              <button
                className="block w-full bg-[blue] md:text-xl text-sm text-white mt-8 h-[3.5rem]"
                onClick={handleSubmit}
                disabled={isLoading} // Disable the button while loading
              >
                {isLoading ? (
                  <AiOutlineCheck className="animate-spin mx-auto" />
                ) : (
                  "Click after Payment"
                )}
              </button>
            </div>
            <Link to="/shop" className="md:hidden">
              <span className="text-lg underline text-stone-400 block text-center my-7">
                Go Back to Kitchen
              </span>
            </Link>
            {showModal && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                  <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  ></div>
                  <div className="bg-white rounded-lg p-6 z-10">
                    <button
                      className="absolute top-2 right-2 text-white text-8xl"
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="flex flex-col items-center justify-center ">
                      <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
                        Transfer Information
                      </h1>
                      <div>
                        <p>Bank Name: Kuda</p>
                        <p>Account Name: Tomata Lomo</p>
                        <p>Account Number: 3845029488202</p>
                        <div className="flex flex-row">
                          Amount to Send:{" "}
                          <span>
                            <div className=" flex flex-row items-center text-red-600 font-semibold">
                              Total:{" "}
                              <span>
                                <TbCurrencyNaira className="text-lg" />
                              </span>{" "}
                              {totalCostWithShipping}
                            </div>
                          </span>
                        </div>
                        <p>Reference: {formData.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </main>
      </section>
    </>
  );
};

export default PaymentPage;
