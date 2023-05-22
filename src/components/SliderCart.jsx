import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecommendCard from "./RecommendCard";

const SliderCart = () => {
  const [fetchError, setFetchError] = useState(null);
  const [kitchen, setKitchen] = useState(null);
  const sliderRef = useRef(null);

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

  const ArrowLeft = (props) => (
    <button
      className="slick-arrow slick-prev"
      onClick={() => sliderRef.current.slickPrev()}
    >
      Previous
    </button>
  );

  const ArrowRight = (props) => (
    <button
      className="slick-arrow slick-next bg-black absolute"
      onClick={() => sliderRef.current.slickNext()}
    >
      Next
    </button>
  );

  // Custom settings for react-slick carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {kitchen && (
        <div className="carousel-container mb-20 overflow-hidden">
          <Slider ref={sliderRef} {...carouselSettings}>
            {kitchen.map((kitchen) => (
              <div key={kitchen.id}>
                <RecommendCard kitchen={kitchen} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default SliderCart;
