import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

const RECORD_INPUT = "home/RECORD_INPUT";
const RECORD_INSERT = "home/RECORD_INSERT";

// action
export const recordInput = createAction(RECORD_INPUT, value => value);
export const recordInsert = createAction(RECORD_INSERT, text => text);

let id = 0;

const initialState = Map({
  input: "",
  list: List()
});

// reducer
export default handleActions(
  {
    [RECORD_INPUT]: (state, action) => {
      const payload = action.payload;
      // console.log("input action: %s", payload);

      return state.set("input", payload);

      // return { input: action.payload };
    },
    [RECORD_INSERT]: (state, { payload: text }) => {
      // console.log("payload: %s", text);
      const item = Map({ id: id++, checked: false, text: text });

      return state.update("list", list => list.push(item));
    }
  },
  initialState
);
