import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);
  return (
    <div className="z-10 w-full h-[10vh] relative flex  items-center mx-auto">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] text-xl mx-3 p-5 outline-none border-none bg-transparent text-zinc-300"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-3xl ri-close-large-line cursor-pointer ml-0"
        ></i>
      )}
      <div className="absolute top-[90%] left-[5%] w-[50%] max-h-[50vh] bg-zinc-200 overflow-auto">
        {searches.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 flex justify-start gap-4 items-center border-b-2 border-zinc-100 duration-300 p-8 text-zinc-600 font-semibold"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover shadow-lg"
              src={`https://image.tmdb.org/t/p/original/${
                d.poster_path || d.backdrop_path || d.profile_path
              }`}
            />
            <span>{d.title || d.original_title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
