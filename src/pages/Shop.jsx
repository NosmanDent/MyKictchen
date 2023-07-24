import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import Categories from "../components/Categories";
import { supabase } from "../supabaseClient";
import SkeletonLoaderTwo from "../components/SkeletonLoaderTwo";
import Loader from "../components/Loader";

function Shop() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [originalItems, setOriginalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("kitchen").select("*");
      if (error) {
        console.log(error);
      } else {
        setMenuItems(data);
        setOriginalItems(data);
        const allCategories = [
          "All",
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(allCategories);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filterItems = (category) => {
    if (category === "All") {
      setMenuItems(originalItems);
    } else {
      const newItems = originalItems.filter(
        (item) => item.category === category
      );
      setMenuItems(newItems);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setMenuItems(originalItems);
    } else {
      const filteredItems = originalItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setMenuItems(filteredItems);
    }
  };

  const loaders = Array.from(Array(menuItems.length || 1), (_, index) => (
    <Loader key={index} />
  ));

  return (
    <main className="bg-pink-300 w-full pt-20 flex flex-col">
      <div className="flex flex-col md:flex-row items-center md:justify-between justify-center w-full px-12 gap-4 ">
        <h2 className="md::text-4xl sm:text-3xl text-2xl border-b border-black p-1  md:w-1/2">
          Our Menu
        </h2>

        <div className=" md:w-1/2 w-full bg-red-900">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search..."
            className="border border-black  focus:outline-none py-2 w-full  px-4 text-xl"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <section className="w-full flex flex-col items-center justify-center">
        <Categories categories={categories} filterItems={filterItems} />
        {loading ? loaders : <Menu items={menuItems} />}
      </section>
    </main>
  );
}

export default Shop;
