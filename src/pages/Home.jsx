import React from "react";
import cooking from "../assets/cooking.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="pt-20 sm:pt-28 md:pt-0 bg-pink-300">
      <section className="h-screen  md:mx-10 mx-10 justify-center flex flex-1 md:flex-row flex-col items-center gap-4 ">
        <div className="md:w-1/2 w-full flex flex-col md:items-start items-center md:justify-start justify-center md:text-start gap-2 text-center">
          <h1 className="text-black font-mono font-semibold md:text-xl  whitespace-nowrap ">
            We Deliver Nationawide
          </h1>
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-serif font-bold">
            We Care About You. Enjoy The Fastest Delivery Here In Niaja..
          </h1>
          <h1 className="md:text-sm text-xs ">
            Good food is healthy food. Food is supposed to sustain you so you
            can live better, not so you can eat more. Some people eat to live,
            and some people live to eat. Eat Good, Look Good!
          </h1>
          <Link to="shop">
            <button className="bg-blue-700 hover:bg-blue-800 text-white md:px-14 px-8 md:py-3 py-2 text-xs md:text-sm rounded-lg">
              ORDER NOW
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 w-full">
          <img src={cooking} alt="" className="" />
        </div>
      </section>

      <section className="bg-black text-white my-20">
        <div className="container flex flex-col mx-auto lg:flex-row">
          <div className="w-full lg:w-1/3 rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
              alt=""
              className="pt-6 pb-5 px-5 md:px-0 rounded-lg"
            />
          </div>
          <div className="flex flex-col w-full p-3 lg:w-2/3 md:p-6 lg:p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8 mb-8 text-blue-700"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h2 className="text-3xl font-semibold leading-none">
              Modern cooking skills to 1000+ type of food
            </h2>
            <p className="mt-4 mb-8 text-sm">
              Starting on March 27, 2020 and end on December 15, 2020
            </p>
            <p className="mt-4 mb-8 text-sm">Registered 15,000+</p>
            <button className="self-start px-10 py-3 text-lg font-medium rounded-3xl bg-blue-700 text-white">
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      <section className="pb-20 mx-10">
        <div className="space-y-3 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 mx-auto text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
          <h3 className="text-3xl text-black font-bold">
            Subscribe to our newsletter
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Stay up to date with the roadmap progress, announcements and
            exclusive discounts feel free to sign up with your email.
          </p>
        </div>
        <div className="mt-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="items-center justify-center sm:flex"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="text-black w-full p-3 rounded-md border outline-none focus:border-indigo-600"
            />
            <button className="w-full mt-3 px-5 py-3 rounded-md text-white bg-blue-700   duration-150 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto">
              Subscribe
            </button>
          </form>
          <p className="mt-3 mx-auto text-center max-w-lg text-[15px] text-gray-800">
            No spam ever, we care about the protection of your data. Read our{" "}
            <a className="text-indigo-600 underline" href="#">
              {" "}
              Privacy Policy{" "}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
