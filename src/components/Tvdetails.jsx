import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removeTV } from "../store/actions/tvActions";
import HorizontalCards from "../partials/HorizontalCards";

const Tvdetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removeTV());
    };
  }, [id]);
  console.log(info);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[180vh] px-[3%]"
    >
      <nav className="h-[10vh] w-full text-zinc-200 flex gap-10 items-center text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="text-4xl ri-arrow-left-fill cursor-pointer mr-[10%]"
        ></Link>
      </nav>
      <div className="w-full flex mt-[2%] px-[5%]">
        <div className="flex items-center gap-10">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[45vh]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
          />
          <div className="text-white">
            <h1 className="text-4xl font-bold">
              {info.detail.name || info.detail.original_name} (
              {info.detail.first_air_date.split("-")[0]})
            </h1>
            <h1 className="flex gap-5">
              {info.detail.genres.map((x) => (
                <li>{x.name}</li>
              ))}
            </h1>
            <div className="mt-5">
              <h1 className="text-xl font-bold">Overview</h1>
              <h1>{info.detail.overview}</h1>
            </div>
            <h1 className="mt-3 text-xl text-yellow-400">
              UserScore: {info.detail.vote_average.toFixed(1)}
              <sup>%</sup>
            </h1>
            <div className="h-[10vh] w-full text-zinc-200 flex gap-10 items-center text-xl">
              <a
                target="_blank"
                className="hover:text-blue-500"
                href={info.detail.homepage}
              >
                <i className="ri-external-link-fill"></i>
              </a>
              <a
                className="hover:text-blue-500"
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="ri-earth-fill"></i>
              </a>
              <a
                className="hover:text-blue-500"
                target="_blank"
                href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
              >
                imdb
              </a>
            </div>
            <Link
              to={`${pathname}/trailer`}
              className="text-xl hover:text-black  border-2 border-zinc-700 px-2 py-1 rounded-lg hover:bg-zinc-700"
            >
              <i className="ri-play-fill mr-2"></i>Play Teaser
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-xl font-bold text-white mb-3 border-b-2 w-[25%]">
          Seasons
        </h1>
        <div className="w-[100%] flex gap-3 overflow-x-auto ">
          {info.detail.seasons.map((s, i) => (
            <>
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[45vh]"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
              />
            </>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-bold text-white mb-3 border-b-2 w-[25%]">
          Recommendations and Similar stuffs
        </h1>
        <HorizontalCards
          data={
            info.recommendation.length > 0 ? info.recommendation : info.similar
          }
        />
      </div>
      <Outlet />
    </div>
  ) : (
    <h1 className="text-8xl font-bold text-center text-white w-full h-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
      Loading
    </h1>
  );
};

export default Tvdetails;
