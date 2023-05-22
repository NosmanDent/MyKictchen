import React, { useState, useEffect, useContext } from "react";
import { MdFastfood } from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../supabaseClient";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getUserDetail } from "../app/userSlice";
import { setUser } from "../app/userSlice";
import { CartContext } from "../CartContext";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const cart = useContext(CartContext);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user === null) {
      dispatch(getUserDetail());
    }
  }, [user, dispatch]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error signing out:", error.message);
    } else {
      dispatch(setUser(null)); // Reset the user state
      window.location.reload(); // Reload the page to require the user to log in again
    }
  };
  return (
    <nav className="bg-black ">
      <div className="xs:mx-6 mx-2 md:mx-10 md:py-6 py-4 flex flex-row flex-1 items-center ">
        <Link to="/">
          <div className="flex flex-1 flex-row items-center ">
            <h1 className="nav-logo italic  md:text-2xl text-sm text-white">
              My
            </h1>
            <MdFastfood className="md:text-3xl text-sm text-red-700" />
            <h1 className="nav-logo italic text-sm md:text-2xl underline text-stone-200">
              Kitchen
            </h1>
          </div>
        </Link>

        <div className="flex flex-1 flex-row items-center justify-end md:gap-2 gap-1 ">
          <input
            type="search"
            name=""
            id=""
            className="hidden sm:flex py-2 rounded-full text-black md:text-sm text-xs focus:outline-none px-3 md:w-[300px] sm:w-[200px] xs:w-[180px] w-[130px] sm:h-10 h-8"
            placeholder="search for meal"
          />
          <Link to="cart">
            <AiOutlineShoppingCart className="text-white text-2xl" />
          </Link>

          <h1
            className="md:text-xs text-[10px] font-bold leading-none
            text-red-100 transform -translate-y-1/2 bg-red-600 rounded-full px-2 py-1   -ml-4"
          >
            {productsCount}
          </h1>
          <Menu
            handleClick={handleClick}
            user={user}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
    </nav>
  );
};

function Menu({ handleClick, user, handleSignOut }) {
  return (
    <ul className="flex items-center flex-col lg:flex-row gap-8 lg:gap-6">
      <li className="cursor-pointer" onClick={handleClick}>
        {user ? (
          <button
            className="bg-purple-600 text-white py-2 md:px-6 px-4 text-xs rounded-lg whitespace-nowrap"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="login"
            className="bg-purple-600 text-white py-2 md:px-6 px-4 text-xs rounded-lg whitespace-nowrap"
          >
            Sign Up
          </NavLink>
        )}
      </li>
    </ul>
  );
}

export default Navbar;
