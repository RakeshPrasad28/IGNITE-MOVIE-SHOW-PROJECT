import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full h-full p-[3%]  flex flex-wrap gap-8 mt-5 bg-[#1F1E24]">
      {data.map((item, index) => (
        <Link
          to={`/${item.media_type || title}/details/${item.id}`}
          className="relative w-[33vh] mx-auto"
          key={index}
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-full h-[45vh]"
            src={`https://image.tmdb.org/t/p/original/${
              item.poster_path || item.backdrop_path || item.profile_path
            }`}
          />
          <h1 className="text-zinc-400 text-xl mt-2 leading-5 tracking-tight">
            {item.title ||
              item.original_title ||
              item.name ||
              item.original_name}
          </h1>
          {item.vote_average && (
            <div className="absolute -right-[5%] bottom-[18%] flex justify-center items-center w-[4vw] h-[4vw] rounded-full text-white text-lg bg-yellow-600">
              {(item.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
