import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movieSlice";
import tvSlice from "./reducers/tvSlice";
import personSlice from "./reducers/personSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    tv: tvSlice,
    person: personSlice,
  },
});
export default store;
