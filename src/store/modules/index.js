// 모든 모듈들을 불러와서 합치는 작업이 이뤄짐
// 여려거ㅐ의 리듀서가 있을때 conbineReducers를 사용하여 하나의 리듀러로 합칠 수 있다 - 루트 리듀서
import { combineReducers } from "redux";
// import counter from './counter';
// import todo from './todo';
import home from "./home";
// import typedHome from "./typedHome";
import fetchData from "./fetchData";

export default combineReducers({
  home,
  // typedHome
  fetchData
});

// export type HomeState = ReturnType<typeof combineReducers>;
