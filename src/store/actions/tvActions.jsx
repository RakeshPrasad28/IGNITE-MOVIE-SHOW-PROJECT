import axios from "../../utils/axios";
import { loadTV } from "../reducers/tvSlice";
export { removeTV } from "../reducers/tvSlice";
// import { useDispatch } from "react-redux";
// const dispatch = useDispatch();

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

    let theUltimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: externalid.data.results,
    };
    dispatch(loadTV(theUltimatedetails));
  } catch (error) {
    console.log("error", error);
  }
};
