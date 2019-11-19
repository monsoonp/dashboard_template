import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

// action type (name)
const FETCH_REQUEST = "fetch/FETCH_REQUEST";
const FETCH_SUCCESS = "fetch/FETCH_SUCCESS";
const FETCH_ERROR = "fetch/FETCH_ERROR";

// action

export const fetchRequest = createAction(FETCH_REQUEST);
export const fetchSuccess = createAction(FETCH_SUCCESS, list => list);
export const fetchError = createAction(FETCH_ERROR);

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchRequest());
    return fetch("/admin/home/list", {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        // "Access-Control-Allow-Origin": "*"
      }
    })
      .then(res => res.json())
      .then(resjs => {
        dispatch(fetchSuccess(resjs));
        dispatch(fetchError(""));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchError(err));
      });
  };
};

const initialState = Map({
  fetchingData: false,
  fetchList: List(),
  isFetched: false,
  error: ""
});

// reducer
export default handleActions(
  {
    [FETCH_REQUEST]: (state, action) => {
      return state.set("fetchingData", true);
    },
    [FETCH_SUCCESS]: (state, { payload: fetchData }) => {
      // console.log("payload: %s", fetchData);
      return state
        .set("fetchingData", false)
        .set("fetchList", fetchData)
        .set("isFetched", true);
    },
    [FETCH_ERROR]: (state, { payload: error }) => {
      console.log("fetching error: %s", error);
      // return state.set(["fetchingData", "error"], false, error);
      return state.set("fetchingData", false);
    }
  },
  initialState
);
