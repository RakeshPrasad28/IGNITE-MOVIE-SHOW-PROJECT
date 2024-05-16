import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "MOVIE DB | TV SHOWS";
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const getperson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setperson((prev) => [...prev, ...data.results]);
        console.log(person);
        setpage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const refreshHandler = () => {
    if (person.length === 0) {
      getperson();
    } else {
      setpage(1);
      setperson([]);
      getperson();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  return person.length > 0 ? (
    <div className="w-screen h-full">
      <div className="w-full px-[3%]  flex justify-center items-center text-white gap-10">
        <h1 className="text-4xl font-bold ml-3">
          <i
            onClick={() => navigate(-1)}
            className="text-4xl ri-arrow-left-fill cursor-pointer"
          ></i>
          CAST:
        </h1>
        <Topnav />
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={getperson}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <h1 className="text-8xl font-bold text-center text-white w-full h-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
      Loading
    </h1>
  );
};

export default People;
