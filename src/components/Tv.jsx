import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
const Tv = () => {
  document.title = "MOVIE DB | TV SHOWS";
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const refreshHandler = () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setpage(1);
      setTv([]);
      getTv();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  return tv.length > 0 ? (
    <div className="w-screen h-full">
      <div className="w-full px-[3%]  flex justify-center items-center text-white gap-10">
        <h1 className="text-4xl font-bold ml-3">
          <i
            onClick={() => navigate(-1)}
            className="text-4xl ri-arrow-left-fill cursor-pointer"
          ></i>
          TV SHOWS:
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["on_the_air", "top_rated", "popular", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <h1 className="text-8xl font-bold text-center text-white w-full h-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
      Loading
    </h1>
  );
};

export default Tv;
