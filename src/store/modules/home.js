import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";

/*
Ducks 구조 - module
reducer 파일안에 액션타입과 액션 생성자함수를 함께 넣어서 관리
*/
// action type (name)
const RECORD_INPUT = "home/RECORD_INPUT";
const RECORD_INSERT = "home/RECORD_INSERT";

const START_TIME = "home/START_TIME";
const END_TIME = "home/END_TIME";

// action
export const recordInput = createAction(RECORD_INPUT, value => value);
export const recordInsert = createAction(RECORD_INSERT, text => text);

export const setStart = createAction(START_TIME, text => text);
export const setEnd = createAction(END_TIME, text => text);

// middleware
export const testInput = e => dispatch => {
  setTimeout(() => {
    dispatch(recordInput(e));
  }, 1000);
};

let id = 0;

const initialState = Map({
  input: "",
  list: List(),
  start: null,
  end: null
});

// reducer
export default handleActions(
  {
    [RECORD_INPUT]: (state, action) => {
      const payload = action.payload;
      // console.log("input action: %s, state: %s", payload);
      // console.log(action.type);
      return state.set("input", payload);
    },
    [RECORD_INSERT]: (state, { payload: text }) => {
      // console.log("payload: %s", text);
      const item = Map({ id: id++, checked: false, text: text });

      return state.update("list", list => list.push(item));
    },

    [START_TIME]: (state, action) => {
      return state.set("start", action.payload);
    },
    [END_TIME]: (state, action) => {
      return state.set("end", action.payload);
    }
  },
  initialState
);
