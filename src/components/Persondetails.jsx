import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import HorizontalCards from "../partials/HorizontalCards";

const Persondetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  return info ? (
    <div className="px-[15%] w-screen h-[150vh] bg-[#1f1e24]">
      <nav className="h-[10vh] w-full text-zinc-200 flex gap-10 items-center text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="text-4xl ri-arrow-left-fill cursor-pointer mr-[10%]"
        ></Link>
      </nav>
      <div className="w-full flex">
        <div className="w-[25%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
          />
          <hr className="mt-5 mb-2 border-none h-[2px] bg-zinc-500" />
          {/* social media */}
          <div className="text-2xl text-white flex gap-x-5">
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
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              className="hover:text-blue-500"
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              className="hover:text-blue-500"
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          <h1 className="text-2xl text-zinc-400 font-bold my-2">Person Info</h1>
          <h1 className="text-xl text-zinc-400 font-bold">Known For</h1>
          <h1 className="text-md text-zinc-400 font-bold">
            {info.detail.known_for_department}
          </h1>
          <h1 className="text-xl text-zinc-400 font-bold mt-3">Gender</h1>
          <h1 className="text-md text-zinc-400 font-bold">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-xl text-zinc-400 font-bold mt-3">Birthday</h1>
          <h1 className="text-md text-zinc-400 font-bold">
            {info.detail.birthday}
          </h1>
          <h1 className="text-xl text-zinc-400 font-bold mt-3">
            Place of Birth
          </h1>
          <h1 className="text-md text-zinc-400 font-bold">
            {info.detail.place_of_birth}
          </h1>
        </div>
        <div className="w-[75%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-bold">
            {info.detail.name}
          </h1>
          <h1 className="text-xl text-zinc-300 font-bold mt-3">Biography</h1>
          <p className="text-zinc-400 mt-2 leading-tight">
            {info.detail.biography}
          </p>
          <h1 className="text-3xl text-zinc-300 font-bold my-2">Movies</h1>
          <HorizontalCards data={info.combinedCredits.cast}/>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-8xl font-bold text-center text-white w-full h-full absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
      Loading
    </h1>
  );
};

export default Persondetails;
