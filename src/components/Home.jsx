import React, { useEffect, useState } from "react";
import Sidenav from "../partials/Sidenav";
import Topnav from "../partials/Topnav";
import axios from "../utils/axios";
import Headers from "../partials/Headers";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "../partials/Dropdown";

const Home = () => {
  document.title = "MOVIE$HOW | Homepage";
  const [wallpapers, setWallpapers] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    const { data } = await axios.get(`/trending/all/day`);
    let randomData =
      data.results[(Math.random() * data.results.length).toFixed()];
    setWallpapers(randomData);
  };

  const getTrending = async () => {
    const { data } = await axios.get(`/trending/${category}/day`);
    setTrending(data.results);
  };
  useEffect(() => {
    getTrending();
    !wallpapers && getHeaderWallpaper();
  }, [category]);

  return wallpapers && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full pt-3 px-5 overflow-auto overflow-x-hidden">
        <Topnav />
        <Headers data={wallpapers} />
        <div className="my-5 flex justify-between items-center">
          <h1 className="text-zinc-400 font-semibold text-xl">Trending</h1>
          <Dropdown
            title="Filter"
            options={["all", "tv", "movie"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <h1 className="text-8xl font-bold text-center text-white w-full h-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
      Loading
    </h1>
  );
};

export default Home;
