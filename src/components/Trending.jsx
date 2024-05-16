import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "MOVIE DB | Trending " +  category;

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      //   setTrending(data.results);
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      setTrending([]);
      getTrending();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  const navigate = useNavigate();
  return trending.length > 0 ? (
    <div className="w-screen h-full">
      <div className="w-full px-[3%]  flex justify-center items-center text-white gap-10">
        <h1 className="text-4xl font-bold ml-3">
          <i
            onClick={() => navigate(-1)}
            className="text-4xl ri-arrow-left-fill cursor-pointer"
          ></i>
          Trending:
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["tv", "movie", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[1vw]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <h1 className="text-8xl font-bold text-center text-white w-full h-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
      Loading
    </h1>
  );
};

export default Trending;
