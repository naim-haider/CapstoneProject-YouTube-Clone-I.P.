import React, { useEffect, useRef, useState } from "react";

const FilterButtons = ({ onFilter }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  //=== Function to update scroll button visibility starts here ===//
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const atLeftEnd = container.scrollLeft === 0;
      const atRightEnd =
        container.scrollLeft + container.clientWidth === container.scrollWidth;

      setCanScrollLeft(!atLeftEnd); // Hide left button when at the start
      setCanScrollRight(!atRightEnd); // Hide right button when at the end
    }
  };

  const scrollContainerRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      updateScrollButtons();
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      updateScrollButtons();
    }
  };

  // Update button visibility on component mount and scroll position change
  useEffect(() => {
    updateScrollButtons();
  }, []);

  //=== Function to update scroll button visibility ends here ===//

  const categories = [
    "Game",
    "Music",
    "React routers",
    "Computer programming",
    "Reverberation",
    "Movie musicals",
    "India national cricket team",
    "News",
    "Mixes",
    "1990s",
    "Telugu cinema",
    "Live",
    "Dramedy",
    "Dubbing",
    "Indian soap opera",
    "Cricket",
    "Football",
    "Learn Coding",
  ];

  return (
    <section
      className="fixed md:top-20 top-15.5 py-3 bg-white  overflow-x-auto md:left-7 lg:left-40 w-screen  md:w-full px-2 md:px-3 h-[10%] flex items-center md:mt-5"
      id="feature-box"
    >
      {canScrollLeft && (
        <div
          onClick={scrollLeft}
          className="h-14 px-4 mr-4 hidden md:flex  text-2xl rounded-2xl font-medium bg-slate-200 hover:bg-slate-300 min-w-12 cursor-pointer justify-center ml-4 items-center "
        >
          <i className="fa-regular fa-less-than" />
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hidden md:max-w-[83%] "
      >
        <div
          onClick={() => onFilter("All")}
          className="h-14 w-18 px-5 bg-black cursor-pointer min-w-fit  flex justify-center items-center text-white rounded-2xl"
        >
          <p className="md:text-xl font-medium">All</p>
        </div>
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => onFilter(category)}
            className="h-14 px-5 md:text-2xl text-xl min-w-fit rounded-2xl font-medium bg-slate-200 hover:bg-slate-300  cursor-pointer flex justify-center ml-2 items-center "
          >
            <p>{category}</p>
          </div>
        ))}
      </div>
      {canScrollRight && (
        <div
          onClick={scrollRight}
          className="h-14 px-4 hidden md:flex text-2xl rounded-2xl font-medium bg-slate-200 hover:bg-slate-300 min-w-12 cursor-pointer justify-center ml-4 items-center "
        >
          <i className="fa-regular fa-greater-than" />
        </div>
      )}
    </section>
  );
};

export default FilterButtons;
