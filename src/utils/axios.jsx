import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjU1ZTcyMWU2ODMwMDA5MTVlZDE3ZmIxYTgyODI4NSIsInN1YiI6IjY1NDNhYWFiNzcxOWQ3MDBlMmFmNTk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g802D8rpQQA2JRE03YeWgkPokBXXb3PQ3XdW5vmaqWw",
  },
});

export default instance;
