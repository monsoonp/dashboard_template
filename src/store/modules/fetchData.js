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

const initialState = Map({
  fetch_list: List(),
  error: ""
});

// reducer
export default handleActions(
  {
    [FETCH_REQUEST]: (state, action) => {
      return state;
    },
    [FETCH_SUCCESS]: (state, { payload: fetchData }) => {
      // console.log("payload: %s", fetchData);
      return state.set("fetch_list", fetchData);
    },
    [FETCH_ERROR]: (state, { payload: error }) => {
      // console.log("payload: %s", error);
      return state.set("error", error);
    }
  },
  initialState
);
