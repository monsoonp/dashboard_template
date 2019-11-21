import { createAction, handleActions, Action } from "redux-actions";
import { Record, List } from "immutable"; // Map

/*
Ducks 구조 - module
reducer 파일안에 액션타입과 액션 생성자함수를 함께 넣어서 관리
*/
// action type (name)
const RECORD_INPUT = "typed/RECORD_INPUT" as const;
const RECORD_INSERT = "typed/RECORD_INSERT" as const;
const RECORD_UPDATE = "typed/RECORD_UPDATE" as const;
const RECORD_DELETE = "typed/RECORD_DELETE" as const;

const START_TIME = "typed/START_TIME" as const;
const END_TIME = "typed/END_TIME" as const;

// action
export const recordInput = createAction(RECORD_INPUT, (input: string) => input);
export const recordInsert = createAction(RECORD_INSERT, (text: string) => text);
export const recordUpdate = createAction(RECORD_UPDATE, (id: number) => id);
export const recordDelete = createAction(RECORD_DELETE, (id: number) => id);

export const setStart = createAction(START_TIME, (text: Date) => text);
export const setEnd = createAction(END_TIME, (text: Date) => text);

let id = 0;

type items = {
  id: number;
  checked: boolean;
  text: string;
};
const itemRecord = Record({
  id: id++,
  checked: false,
  text: ""
});

const HomeStateRecord = Record({
  input: "",
  list: List(),
  start: new Date(),
  end: new Date()
});
export class HomeState extends HomeStateRecord {
  input!: string;
  list!: List<items>;
  start!: Date;
  end!: Date;
}

export type HomeAction =
  | ReturnType<typeof recordInput>
  | ReturnType<typeof recordInsert>
  | ReturnType<typeof recordUpdate>
  | ReturnType<typeof recordDelete>
  | ReturnType<typeof setStart>
  | ReturnType<typeof setEnd>;

const initialState = new HomeState();

/*
= {
  input: "",
  list: List(),
  start: new Date(),
  end: new Date()
};
*/
// reducer
export default handleActions<HomeState, any>(
  {
    [RECORD_INPUT]: (state, action): HomeState => {
      const payload = action.payload;
      // console.log("input action: %s, state: %s", payload);
      // console.log(action.type);
      return state.set("input", payload);
    },
    [RECORD_INSERT]: (state, { payload: text }): HomeState => {
      // console.log("payload: %s", text);
      const item = itemRecord({ id: id++, text });
      // update 는 현재 값을 읽어온 다음에 함수에서 정의한 업데이트 로직에 따라 값 변경
      return state.update("list", (list: List<items>) => list.push(item));
    },
    [RECORD_UPDATE]: (state, { payload: id }): HomeState => {
      const index = state.list.findIndex(item => item.id === id);
      // 특정 인덱스의 entered 필드 값을 반전
      return state.updateIn(
        ["list", index, "checked"],
        // checked => !checked
        (isChecked: boolean) => !isChecked
      );
    },
    [RECORD_DELETE]: (state, { payload: id }): HomeState => {
      const index = state.list.findIndex(item => item.id === id);
      return state.deleteIn(["list", index]);
    },
    [START_TIME]: (state, action): HomeState => {
      return state.set("start", action.payload);
    },
    [END_TIME]: (state, action): HomeState => {
      return state.set("end", action.payload);
    }
  },
  initialState
);
