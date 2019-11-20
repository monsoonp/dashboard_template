import React, { useEffect } from "react";
// import Index from "pages/Index";
import Home from "pages/Home";
import { connect } from "react-redux";
// import{bindActionCreators} from 'redux';

import { HomeActions } from "store/actionCreators"; // FetchActions

const HomeContainer = ({ input, list, start, end }) => {
  // fetchList
  const handleChange = e => {
    // console.log("change: %s", input);
    HomeActions.recordInput(e.target.value);
    // HomeActions.testInput(e.target.value); // 비동기
  };
  const handleInsert = () => {
    // const { input } = props;
    // console.log(list);
    HomeActions.recordInsert(input);
    HomeActions.recordInput("");
  };
  const handleUpdate = id => {
    HomeActions.recordUpdate(id);
  };
  const handleDelete = id => {
    HomeActions.recordDelete(id);
  };

  const setStart = value => {
    HomeActions.setStart(value);
  };
  const setEnd = value => {
    HomeActions.setEnd(value);
  };
  // const { fetchData } = FetchActions;
  // const dispatch = useDispatch();
  useEffect(() => {
    // fetchData();
  });

  return (
    <Home
      input={handleChange}
      insert={handleInsert}
      list={list}
      text={input}
      start={start}
      end={end}
      setStart={setStart}
      setEnd={setEnd}
      update={handleUpdate}
      remove={handleDelete}
      // data={fetchList}
    />
  );
};
const mapStateToProps = ({ home }) => {
  // console.log(state.home);
  return {
    input: home.get("input"),
    list: home.get("list"),
    start: home.get("start"),
    end: home.get("end")
    // fetchList: home.get("fetchList")
  };
};
/*
const mapDispachToProps = dispatch => {
  return {
    fetchRequest: () => dispatch({ type: "FETCH_REQUEST" }),
    fetchSuccess: () => dispatch({ type: "FETCH_SUCCESS" }),
    fetchFailed: () => dispatch({ type: "FETCH_ERROR" })
  };
};
*/
export default connect(mapStateToProps)(HomeContainer);
