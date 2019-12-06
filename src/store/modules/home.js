import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
// import socketIOClient from "socket.io-client";

/*
Ducks 구조 - module
reducer 파일안에 액션타입과 액션 생성자함수를 함께 넣어서 관리
*/
// action type (name)
const RECORD_INPUT = "home/RECORD_INPUT";
const RECORD_INSERT = "home/RECORD_INSERT";
const RECORD_UPDATE = "home/RECORD_UPDATE";
const RECORD_DELETE = "home/RECORD_DELETE";

const START_TIME = "home/START_TIME";
const END_TIME = "home/END_TIME";

// action
export const recordInput = createAction(RECORD_INPUT, input => input);
export const recordInsert = createAction(RECORD_INSERT, text => text);
export const recordUpdate = createAction(RECORD_UPDATE, id => id);
export const recordDelete = createAction(RECORD_DELETE, id => id);

export const setStart = createAction(START_TIME, text => text);
export const setEnd = createAction(END_TIME, text => text);

// middleware
export const testInput = e => dispatch => {
  setTimeout(() => {
    dispatch(recordInput(e));
  }, 1000);
};

let id = 0;
/*
const response ={
  response: false,
  endpoint: "http://localhost:5000"
};
const { endpoint } = response;
const socket = socketIOClient(endpoint);
*/
const initialState = Map({
  input: "",
  list: List(),
  start: new Date() - 1 * 24 * 60 * 60 * 1000,
  end: null
  // socket: socket
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
      // update 는 현재 값을 읽어온 다음에 함수에서 정의한 업데이트 로직에 따라 값 변경
      return state.update("list", list => list.push(item));
    },
    [RECORD_UPDATE]: (state, { payload: id }) => {
      const index = state.get("list").findIndex(item => item.get("id") === id);
      // 특정 인덱스의 checked 필드 값을 반전
      return state.updateIn(
        ["list", index, "checked"],
        // checked => !checked
        isChecked => !isChecked
      );
    },
    [RECORD_DELETE]: (state, { payload: id }) => {
      const index = state.get("list").findIndex(item => item.get("id") === id);
      return state.deleteIn(["list", index]);
    },
    [START_TIME]: (state, action) => {
      return state.set("start", action.payload);
    },
    [END_TIME]: (state, action) => {
      return state.set("end", action.payload);
    },
    InvalidType: (state, action) => {
      // 타입 에러
      console.log("error");
      return state;
    }
  },
  initialState
);
