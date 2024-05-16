import React from "react";
import { Link } from "react-router-dom";

const Headers = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url(https://image.tmdb.org/t/p/original/${
          data.poster_path || data.backdrop_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-[60vh] flex flex-col justify-end items-start px-10 py-[5%]"
    >
      <h1 className="w-[50%] text-4xl text-white font-bold">
        {data.title || data.original_title || data.name || data.original_name}
      </h1>
      <p className="w-[50%] text-white">
        {data.overview.slice(0, 220)}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400"
        >
          ...more
        </Link>
      </p>
      <p className="text-white mt-1">
        <i className="text-yellow-500 ri-megaphone-fill"></i>
        {data.release_date || "No Info"}
        <i className="text-yellow-500 ri-album-fill ml-5 mr-1"></i>
        {data.media_type}
      </p>
      <Link
        to={`${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#5f54a7] hover:bg-[#c36b13] hover:text-black px-3 py-1 font-semibold rounded-lg duration-500 text-white mt-1"
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Headers;
