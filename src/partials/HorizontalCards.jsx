import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full h-[40vh] flex gap-3 overflow-y-hidden">
      {data.length > 0 ? (
        data.map((t, i) => (
          <Link
            to={`/${t.media_type}/details/${t.id}`}
            key={i}
            className="min-w-[15%] bg-zinc-900 mb-3 hover:scale-125"
          >
            <img
              className="w-full h-[55%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                t.poster_path || t.backdrop_path
              }`}
              alt=""
            />
            <div className="text-white p-1">
              <h1 className="text-lg  font-bold leading-4 my-1">
                {t.title || t.original_title || t.name || t.original_name}
              </h1>
              <p className="text-sm leading-4">
                {t?.overview?.slice(0, 80)}
                <span className="text-blue-400">...more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-bold text-center mt-3">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
