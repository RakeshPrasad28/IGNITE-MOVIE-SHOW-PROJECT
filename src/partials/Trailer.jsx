import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../components/Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return (
    <div className="absolute w-screen h-screen bg-[rgba(0,0,0,0.9)] z-[100] top-0 left-0 flex items-center justify-center ">
      <Link
        onClick={() => navigate(-1)}
        className="absolute right-[4%] top-[3%] text-white text-4xl ri-close-fill cursor-pointer"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
          controls
          width={1280}
          height={600}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Trailer;
