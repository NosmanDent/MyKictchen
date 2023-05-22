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
        setLoading(false); // Set loading status to false after data is fetched
      }
    }
    fetchData();
  }, []);

  const filterItems = (category) => {
    if (category === "All") {
      setMenuItems(originalItems);
      return;
    }
    const newItems = originalItems.filter((item) => item.category === category);
    setMenuItems(newItems);
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
        <Categories categories={categories} filterItems={filterItems} />
        {loading ? loaders : <Menu items={menuItems} />}
      </section>
    </main>
  );
}

export default Shop;
