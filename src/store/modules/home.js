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
  test_list: List()
});

// reducer
export default handleActions(
  {
    [RECORD_INPUT]: (state, action) => {
      return state.set("input", action.payload);
    },
    [RECORD_INSERT]: (state, { payload: text }) => {
      const item = Map({ id: id++, checked: false, text });
      return state.update("test_list", test_list => test_list.push(item));
    }
  },
  initialState
);
