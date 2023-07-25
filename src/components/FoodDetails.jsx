import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Loader from "./Loader";
import { TbCurrencyNaira } from "react-icons/tb";
import { RiEyeCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillDelete } from "react-icons/ai";
import RecommendCard from "./RecommendCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaBowlFood } from "react-cons/fa";
import "../components/foodDetails.css";

function FoodDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [kitchen, setKitchen] = useState(null);

  useEffect(() => {
    const fetchKitchen = async () => {
      const { data, error } = await supabase.from("kitchen").select();

      if (error) {
        setFetchError("Could not fetch the foods");
        setKitchen(null);
      }
      if (data) {
        const randomKitchen = getRandomItems(data, 10);
        setKitchen(randomKitchen);
        setFetchError(null);
      }
    };

    fetchKitchen();
  }, []);

  const getRandomItems = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const mappedItems =
    kitchen &&
    kitchen.map((kitchen) => (
      <div key={kitchen.id}>
        <RecommendCard kitchen={kitchen} id={kitchen.id} />
      </div>
    ));

  const cart = useContext(CartContext);
  const productQuantity = product ? cart.getProductQuantity(product.id) : 0;
  const { user } = useSelector((state) => state.user);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please sign in to add to cart", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (product) {
      cart.addOneToCart(product.id);
      console.log("product:", product);
      console.log("cart:", cart);
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("kitchen")
        .select("*")
        .eq("id", productId)
        .single();
      if (error) {
        console.log(error);
      } else {
        setProduct(data);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <MdNavigateBefore size={32} />
      </div>
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <MdNavigateNext size={32} />
      </div>
    );
  };

  const { title, description, price, img, category, status } = product;

  return (
    <section className="bg-pink-300">
      <div className=" px-10  pt-10 ">
        <Link to="/shop">
          <div className="flex flex-row items-center gap-2">
            <RiEyeCloseLine className="text-3xl " />
          </div>
        </Link>
        <h1 className="mt-20 mb-6 nav-logo md:text-5xl sm:text-3xl text-xl font-semibold border-b pb-4 border-black">
          More Details about <span className="text-[#9333EA]">{title}</span>
        </h1>
        <div className="flex flex-col gap-8 md:flex-row md:items-center w-full mb-20">
          <div className="md:w-1/2 md:h-[500px] h-[300px] w-full shadow-lg shadow-black rounded-lg ">
            <img
              src={img}
              alt={title}
              className=" rounded-lg object-cover h-full w-full"
            />
          </div>
          <div className="md:w-1/2 w-full  flex flex-col gap-1 md:items-start md:justify-start items-center justify-center">
            <h1 className="text-2xl md:text-3xl nav-logo font-bold">
              Name: {title}
            </h1>
            <h1 className="text-xl font-semibold text-stone-500">
              Category: <span className="text-blue-700">{category}</span>
            </h1>
            <p className="text-gray-600 md:text-sm text-xs md:text-start text-center">
              {description}
            </p>
            {status && (
              <p className="capitalize text-stone-700 text-xl md:text-3xl rounded-lg">
                Status: {status} Food
              </p>
            )}
            <p className="text-2xl font-bold mt-4 flex items-center">
              <TbCurrencyNaira className="text-2xl" />
              {price.toFixed(2)}
            </p>
            {productQuantity > 0 ? (
              <>
                <div className="flex md:flex-row flex-col gap-2 items-center">
                  <label htmlFor="" className="text-xs font-semibold">
                    <FaBowlFood />: {productQuantity}
                  </label>
                  <div className="bg-black/50 rounded-full py-2 px-6">
                    <button
                      className="bg-black rounded-full text-white md:text-3xl text-lg py-1 px-3 shadow-lg shadow-white "
                      onClick={() => cart.addOneToCart(product.id)}
                    >
                      +
                    </button>
                    <button
                      className=" rounded-full text-white md:text-2xl text-xl py-[10px] px-3 "
                      onClick={() => cart.deleteFromCart(product.id)}
                    >
                      <AiFillDelete />
                    </button>
                    <button
                      className="bg-black rounded-full text-white md:text-3xl text-lg py-1 px-3 shadow-lg shadow-white "
                      onClick={() => cart.removeOneFromCart(product.id)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button
                type="button"
                className="button"
                onClick={handleAddToCart}
              >
                <span className="button__text -ml-5">ORDER NOW</span>
                <span className="button__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="currentColor"
                    height="24"
                    fill="none"
                    className="svg"
                  >
                    <line y2="19" y1="5" x2="12" x1="12"></line>
                    <line y2="12" y1="12" x2="19" x1="5"></line>
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <ToastContainer autoClose={3000} />

      <section className="overflow-hidden">
        <div className=" my-40">
          <h1 className="nav-logo mx-10 md:text-5xl sm:text-3xl text-xl font-semibold mb-10 border-b pb-4 border-black">
            Check out more food we belive you will like
          </h1>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={4}
            slidesToScroll={1}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
            ]}
          >
            {mappedItems}
          </Slider>
        </div>
      </section>
    </section>
  );
}

export default FoodDetails;
