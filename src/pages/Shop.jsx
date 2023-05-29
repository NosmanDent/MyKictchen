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
    <main>
      <section className="mt-20  w-full flex flex-col flex-1 items-center justify-center">
        <div className="title">
          <h2 className="md:text-6xl sm:text-4xl text-3xl nav-logo border-b border-black p-1 flex items-end justify-end ">
            Our Menu
          </h2>
        </div>
        <div className="w-full flex items-center justify-center">
          <input
            type="search"
            name=""
            id=""
            placeholder="Search..."
            className="border border-black rounded-tl-full rounded-br-full focus:outline-none mt-10 py-4  w-1/2  px-10 text-xl"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        {loading ? loaders : <Menu items={menuItems} />}
      </section>
    </main>
  );
}

export default Shop;
