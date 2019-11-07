import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

const RECORD_INPUT = "home/RECORD_INPUT";
const RECORD_INSERT = "home/RECORD_INSERT";

// action
export const recordInput = createAction(RECORD_INPUT, value => value);
export const recordInsert = createAction(RECORD_INSERT, text => text);

// let id = 0;

const initialState = Map({
  input: "",
  list: List()
});

// reducer
export default handleActions(
  {
    [RECORD_INPUT]: (state, action) => {
      // console.log(action.payload);
      return state.set("input", action.payload);
    },
    [RECORD_INSERT]: (state, action) => {
      console.log(action);
      // const item = Map({ id: id++, checked: false, text });

      return state.update("list", list => list.push(action.payload));
    }
  },
  initialState
);
