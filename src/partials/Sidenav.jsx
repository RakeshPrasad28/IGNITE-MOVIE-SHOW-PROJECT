import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-5">
      <h1 className="text-[#efa75e] text-4xl text-center font-bold">
        <i className="ri-tv-fill mr-2"></i>
        MOVIE$HOW
      </h1>
      <nav className="flex flex-col gap-5 text-zinc-400 text-xl px-3 pb-1">
        <h1 className="text-teal-400 font-bold text-center text-xl pt-5 px-[2vw]">
          CATEGORIES
        </h1>
        <Link to="/trending" className="hover:bg-[#c36b13] hover:text-black rounded-lg duration-300 py-4 text-center">
          <i className="ri-fire-fill mr-2"></i>TRENDING
        </Link>
        <Link to="/popular" className="hover:bg-[#c36b13] hover:text-black rounded-lg duration-300 py-4 text-center">
          <i className="ri-bard-fill mr-2"></i>POPULAR
        </Link>
        <Link to="/movie" className="hover:bg-[#c36b13] hover:text-black rounded-lg duration-300 py-4 text-center">
          <i className="ri-tv-fill mr-2"></i>MOVIES
        </Link>
        <Link to="/tv" className="hover:bg-[#c36b13] hover:text-black rounded-lg duration-300 py-4 text-center">
          <i className="ri-clapperboard-fill mr-2"></i>TV SHOWS
        </Link>
        <Link to="/person" className="hover:bg-[#c36b13] hover:text-black rounded-lg duration-300 py-4 text-center">
          <i className="ri-account-circle-fill mr-2"></i>PEOPLE
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-400" />
      <nav className="flex flex-col gap-5 text-zinc-400 text-xl px-3">
        <h1 className="text-teal-400 font-bold text-center text-xl pt-5 px-[1vw]">
          Website Information
        </h1>
        <Link className="hover:bg-[#c36b13] hover:text-black rounded-lg duration-300 py-4 text-center">
          <i className="ri-fire-fill mr-2"></i>ABOUT 
        </Link>
        <Link className="hover:bg-[#c36b13] hover:text-black rounded-lg duration-300 py-4 text-center">
          <i className="ri-bard-fill mr-2"></i>CONTACT
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
